"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

type Job = {
  _id?: string
  title: string
  experience: string
  description: string
  requirements: string[]
}

type Service = {
  _id?: string
  title: string
  description: string
}

const AdminPage = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false)
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false)

  // Job form state
  const [jobForm, setJobForm] = useState<Job>({
    title: "",
    experience: "",
    description: "",
    requirements: [""],
  })

  // Service form state
  const [serviceForm, setServiceForm] = useState<Service>({
    title: "",
    description: "",
  })

  // Fetch data
  useEffect(() => {
    fetchJobs()
    fetchServices()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs")
      const data = await res.json()
      setJobs(data)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    }
  }

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services")
      const data = await res.json()
      setServices(data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch services:", error)
      setLoading(false)
    }
  }

  // Job CRUD operations
  const handleCreateJob = async () => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      })
      if (res.ok) {
        fetchJobs()
        resetJobForm()
        setIsJobDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to create job:", error)
    }
  }

  const handleUpdateJob = async () => {
    if (!editingJob?._id) return
    try {
      const res = await fetch(`/api/jobs/${editingJob._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      })
      if (res.ok) {
        fetchJobs()
        setEditingJob(null)
        resetJobForm()
        setIsJobDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to update job:", error)
    }
  }

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" })
      if (res.ok) {
        console.log(res)
        fetchJobs()
      }
    } catch (error) {
      console.error("Failed to delete job:", error)
    }
  }

  // Service CRUD operations
  const handleCreateService = async () => {
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceForm),
      })
      if (res.ok) {
        fetchServices()
        resetServiceForm()
        setIsServiceDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to create service:", error)
    }
  }

  const handleUpdateService = async () => {
    if (!editingService?._id) return
    try {
      const res = await fetch(`/api/services/${editingService._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingService._id, ...serviceForm }),
      })
      if (res.ok) {
        fetchServices()
        setEditingService(null)
        resetServiceForm()
        setIsServiceDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to update service:", error)
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" })
      if (res.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error("Failed to delete service:", error)
    }
  }

  // Form helpers
  const resetJobForm = () => {
    setJobForm({ title: "", experience: "", description: "", requirements: [""] })
  }

  const resetServiceForm = () => {
    setServiceForm({ title: "", description: "" })
  }

  const openJobDialog = (job?: Job) => {
    if (job) {
      setEditingJob(job)
      setJobForm({ ...job })
    } else {
      setEditingJob(null)
      resetJobForm()
    }
    setIsJobDialogOpen(true)
  }

  const openServiceDialog = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setServiceForm({ ...service })
    } else {
      setEditingService(null)
      resetServiceForm()
    }
    setIsServiceDialogOpen(true)
  }

  const addRequirement = () => {
    setJobForm({ ...jobForm, requirements: [...jobForm.requirements, ""] })
  }

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...jobForm.requirements]
    newRequirements[index] = value
    setJobForm({ ...jobForm, requirements: newRequirements })
  }

  const removeRequirement = (index: number) => {
    const newRequirements = jobForm.requirements.filter((_, i) => i !== index)
    setJobForm({ ...jobForm, requirements: newRequirements })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage jobs and services</p>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Job Positions</h2>
              <Button onClick={() => openJobDialog()} className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Job
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Requirements</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job,index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{job.experience}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{job.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{job.requirements.length} items</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => openJobDialog(job)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteJob(job._id!)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Services</h2>
              <Button onClick={() => openServiceDialog()} className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service,index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell className="max-w-md truncate">{service.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => openServiceDialog(service)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteService(service._id!)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Job Dialog */}
        <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingJob ? "Edit Job" : "Add New Job"}</DialogTitle>
              <DialogDescription>
                {editingJob ? "Update the job details below." : "Fill in the details for the new job position."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="job-title">Title *</Label>
                <Input
                  id="job-title"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g., Senior Tax Consultant"
                />
              </div>

              <div>
                <Label htmlFor="job-experience">Experience *</Label>
                <Input
                  id="job-experience"
                  value={jobForm.experience}
                  onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                  placeholder="e.g., 3-5 years"
                />
              </div>

              <div>
                <Label htmlFor="job-description">Description *</Label>
                <Textarea
                  id="job-description"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Describe the job role and responsibilities..."
                  rows={3}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Requirements</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {jobForm.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={req}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        placeholder="Enter requirement..."
                      />
                      {jobForm.requirements.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeRequirement(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsJobDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={editingJob ? handleUpdateJob : handleCreateJob}
                  className="bg-cyan-600 hover:bg-cyan-700"
                  disabled={!jobForm.title || !jobForm.experience || !jobForm.description}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingJob ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Service Dialog */}
        <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
              <DialogDescription>
                {editingService ? "Update the service details below." : "Fill in the details for the new service."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="service-title">Title</Label>
                <Input
                  id="service-title"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g., Tax Planning & Preparation"
                />
              </div>

              <div>
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                  id="service-description"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  placeholder="Describe the service..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={editingService ? handleUpdateService : handleCreateService}
                  className="bg-cyan-600 hover:bg-cyan-700"
                  disabled={!serviceForm.title}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingService ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AdminPage
