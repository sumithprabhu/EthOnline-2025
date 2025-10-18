'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  repoUrl: string;
  description: string;
  status: 'pending' | 'processing' | 'verified' | 'flagged';
  score?: number;
  createdAt: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    repoUrl: '',
    description: ''
  });

  // Load projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      } else {
        console.error('Failed to load projects');
        // Fallback to empty array if API fails
        setProjects([]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to empty array if API fails
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/projects/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        // Add the new project to the list
        const newProject: Project = {
          id: result.id,
          name: formData.name,
          repoUrl: formData.repoUrl,
          description: formData.description,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        setProjects(prev => [newProject, ...prev]);
        
        // Reset form
        setFormData({ name: '', repoUrl: '', description: '' });
        setShowAddForm(false);
      } else {
        console.error('Failed to register project');
      }
    } catch (error) {
      console.error('Error registering project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the project from the list
        setProjects(prev => prev.filter(project => project.id !== projectId));
      } else {
        console.error('Failed to delete project');
        alert('Failed to delete project. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project. Please try again.');
    }
  };

  const handleViewDetails = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      if (response.ok) {
        const project = await response.json();
        // For now, just show an alert with project details
        // In a real app, you'd open a modal or navigate to a details page
        alert(`Project Details:\n\nName: ${project.name}\nRepository: ${project.repoUrl}\nDescription: ${project.description}\nStatus: ${project.status}\nScore: ${project.score ? (project.score * 100).toFixed(1) + '%' : 'N/A'}\nCreated: ${new Date(project.createdAt).toLocaleString()}`);
      } else {
        console.error('Failed to fetch project details');
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] font-sans tracking-tight relative overflow-x-hidden">
      {/* Header */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/" className="focus:outline-none">
          <div className="bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg cursor-pointer">
            <h1 className="text-2xl font-black text-white">🔐 POBU</h1>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="absolute top-6 right-6 z-10 flex gap-3">
        <Link href="/dashboard" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          Dashboard
        </Link>
        <Link href="/api-docs" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          API Docs
        </Link>
        <Link href="/disputes" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          Disputes
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-[#8B7355] mb-4">Project Dashboard</h1>
            <p className="text-lg text-black/80">Manage your projects and track their verification status</p>
          </div>

          {/* Add Project Button */}
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-xl font-bold text-white hover:bg-[#8B7355]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
            >
              {showAddForm ? 'Cancel' : '+ Add New Project'}
            </button>
          </div>

          {/* Add Project Form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl mb-8"
            >
              <h2 className="text-2xl font-black mb-6 text-[#8B7355]">Add New Project</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[#8B7355] mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label htmlFor="repoUrl" className="block text-sm font-bold text-[#8B7355] mb-2">
                    GitHub Repository URL *
                  </label>
                  <input
                    type="url"
                    id="repoUrl"
                    name="repoUrl"
                    value={formData.repoUrl}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                    placeholder="https://github.com/username/repository"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-bold text-[#8B7355] mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                    placeholder="Describe your project..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-xl font-bold text-white hover:bg-[#8B7355]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Adding Project...' : 'Add Project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-xl font-bold text-black hover:bg-gray-50 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Projects List */}
          <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-[#8B7355]">Your Projects</h2>
              <button
                onClick={loadProjects}
                disabled={isLoading}
                className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black disabled:opacity-50"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-lg text-black/60">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-xl font-bold text-[#8B7355] mb-2">No Projects Yet</h3>
                <p className="text-black/60 mb-4">Add your first project to get started with verification</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#8B7355] border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-lg font-bold text-white hover:bg-[#8B7355]/90 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                >
                  Add Project
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 rounded-lg hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#8B7355] mb-2">{project.name}</h3>
                        <p className="text-sm text-black/60 mb-2">{project.repoUrl}</p>
                        {project.description && (
                          <p className="text-black/80">{project.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(project.status)}`}>
                          {getStatusIcon(project.status)} {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                        {project.score && (
                          <span className="text-sm font-bold text-[#8B7355]">
                            Score: {(project.score * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-black/60">
                      <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewDetails(project.id)}
                          className="text-[#8B7355] hover:text-[#8B7355]/80 font-bold"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-600 hover:text-red-800 font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
