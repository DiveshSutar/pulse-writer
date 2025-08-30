import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PenTool, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  EyeOff,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock user blogs data
const mockUserBlogs = [
  {
    id: "1",
    title: "Getting Started with React Hooks",
    excerpt: "A comprehensive guide to understanding and using React Hooks in your applications.",
    status: "approved",
    publishedAt: "2024-01-15",
    views: 1234,
    likes: 56,
    comments: 12,
    tags: ["React", "JavaScript", "Hooks"]
  },
  {
    id: "2",
    title: "Building RESTful APIs with Express.js",
    excerpt: "Learn how to create robust APIs using Express.js and best practices for backend development.",
    status: "pending",
    submittedAt: "2024-01-12",
    tags: ["Node.js", "Express", "API"]
  },
  {
    id: "3",
    title: "CSS Grid Layout Masterclass",
    excerpt: "Master CSS Grid with practical examples and real-world layouts.",
    status: "rejected",
    submittedAt: "2024-01-10",
    rejectionReason: "Content needs more detailed examples and better formatting.",
    tags: ["CSS", "Layout", "Design"]
  },
  {
    id: "4",
    title: "Introduction to TypeScript",
    excerpt: "Getting started with TypeScript for better JavaScript development.",
    status: "hidden",
    publishedAt: "2024-01-05",
    views: 789,
    likes: 23,
    comments: 5,
    tags: ["TypeScript", "JavaScript"]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Published</Badge>;
    case "pending":
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    case "rejected":
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
    case "hidden":
      return <Badge variant="secondary"><EyeOff className="h-3 w-3 mr-1" />Hidden</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <Card className="hover-lift">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">{blog.title}</CardTitle>
            {getStatusBadge(blog.status)}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {blog.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {blog.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {blog.status === "approved" && (
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{blog.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>👍</span>
              <span>{blog.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>💬</span>
              <span>{blog.comments}</span>
            </div>
          </div>
        )}

        {blog.status === "pending" && (
          <p className="text-sm text-muted-foreground">
            Submitted on {new Date(blog.submittedAt).toLocaleDateString()}
          </p>
        )}

        {blog.status === "rejected" && blog.rejectionReason && (
          <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
            <p className="font-medium text-destructive mb-1">Rejection Reason:</p>
            <p className="text-muted-foreground">{blog.rejectionReason}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function MyBlogs() {
  const approvedBlogs = mockUserBlogs.filter(blog => blog.status === "approved");
  const pendingBlogs = mockUserBlogs.filter(blog => blog.status === "pending");
  const rejectedBlogs = mockUserBlogs.filter(blog => blog.status === "rejected");
  const hiddenBlogs = mockUserBlogs.filter(blog => blog.status === "hidden");

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Blog Posts</h1>
            <p className="text-muted-foreground">
              Manage your blog posts and track their publication status.
            </p>
          </div>
          <Link to="/create">
            <Button className="flex items-center space-x-2" variant="hero">
              <PenTool className="h-4 w-4" />
              <span>Create New Post</span>
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({mockUserBlogs.length})</TabsTrigger>
            <TabsTrigger value="published">Published ({approvedBlogs.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingBlogs.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedBlogs.length})</TabsTrigger>
            <TabsTrigger value="hidden">Hidden ({hiddenBlogs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockUserBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {approvedBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {pendingBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            {pendingBlogs.length === 0 && (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No pending blog posts.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {rejectedBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            {rejectedBlogs.length === 0 && (
              <div className="text-center py-12">
                <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No rejected blog posts.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="hidden" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {hiddenBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            {hiddenBlogs.length === 0 && (
              <div className="text-center py-12">
                <EyeOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hidden blog posts.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}