import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  EyeOff,
  BarChart3,
  Users,
  FileText,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

// Mock pending blogs for admin review
const mockPendingBlogs = [
  {
    id: "1",
    title: "Advanced React Patterns and Best Practices",
    excerpt: "Exploring advanced React patterns including render props, compound components, and custom hooks.",
    author: { name: "John Doe", email: "john@example.com" },
    submittedAt: "2024-01-12",
    tags: ["React", "JavaScript", "Patterns"],
    wordCount: 2500
  },
  {
    id: "2",
    title: "Building Microservices with Docker and Kubernetes",
    excerpt: "A comprehensive guide to containerizing applications and orchestrating microservices.",
    author: { name: "Jane Smith", email: "jane@example.com" },
    submittedAt: "2024-01-11",
    tags: ["Docker", "Kubernetes", "Microservices"],
    wordCount: 3200
  },
  {
    id: "3",
    title: "GraphQL vs REST: When to Use Each",
    excerpt: "Comparing GraphQL and REST APIs with practical examples and use cases.",
    author: { name: "Alex Johnson", email: "alex@example.com" },
    submittedAt: "2024-01-10",
    tags: ["GraphQL", "REST", "API"],
    wordCount: 1800
  }
];

// Mock published blogs for management
const mockPublishedBlogs = [
  {
    id: "4",
    title: "Getting Started with React Server Components",
    author: { name: "Sarah Chen" },
    publishedAt: "2024-01-15",
    views: 2341,
    likes: 124,
    comments: 18,
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    id: "5",
    title: "Building Scalable APIs with Node.js",
    author: { name: "Mike Wilson" },
    publishedAt: "2024-01-12",
    views: 1876,
    likes: 89,
    comments: 12,
    tags: ["Node.js", "API", "Backend"]
  }
];

const stats = {
  totalBlogs: 156,
  pendingReview: 3,
  publishedThisMonth: 24,
  totalAuthors: 48,
  totalViews: 89234,
  averageReadTime: "4.2 min"
};

const PendingBlogCard = ({ blog, onApprove, onReject }: any) => {
  return (
    <Card className="hover-lift">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">{blog.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>by {blog.author.name}</span>
              <span>•</span>
              <span>{blog.wordCount} words</span>
              <span>•</span>
              <span>{new Date(blog.submittedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {blog.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {blog.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onApprove(blog.id)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <Button 
            size="sm" 
            variant="destructive" 
            className="flex-1"
            onClick={() => onReject(blog.id)}
          >
            <XCircle className="h-4 w-4 mr-1" />
            Reject
          </Button>
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PublishedBlogCard = ({ blog, onHide, onUnhide }: any) => {
  const [isHidden, setIsHidden] = useState(false);
  
  const handleToggleVisibility = () => {
    if (isHidden) {
      onUnhide(blog.id);
      setIsHidden(false);
    } else {
      onHide(blog.id);
      setIsHidden(true);
    }
  };

  return (
    <Card className="hover-lift">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">{blog.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>by {blog.author.name}</span>
              <span>•</span>
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            {isHidden ? <EyeOff className="h-3 w-3 mr-1" /> : <CheckCircle className="h-3 w-3 mr-1" />}
            {isHidden ? "Hidden" : "Published"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {blog.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
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

        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant={isHidden ? "default" : "outline"}
            className="flex-1"
            onClick={handleToggleVisibility}
          >
            {isHidden ? (
              <>
                <Eye className="h-4 w-4 mr-1" />
                Unhide
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4 mr-1" />
                Hide
              </>
            )}
          </Button>
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AdminDashboard() {
  const [pendingBlogs, setPendingBlogs] = useState(mockPendingBlogs);

  const handleApprove = (blogId: string) => {
    setPendingBlogs(pendingBlogs.filter(blog => blog.id !== blogId));
    toast.success("Blog approved and published!");
  };

  const handleReject = (blogId: string) => {
    setPendingBlogs(pendingBlogs.filter(blog => blog.id !== blogId));
    toast.error("Blog rejected and author notified.");
  };

  const handleHide = (blogId: string) => {
    toast.info("Blog hidden from public view.");
  };

  const handleUnhide = (blogId: string) => {
    toast.success("Blog made visible to public.");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage blog content, review submissions, and monitor platform analytics.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Blogs</p>
                  <p className="text-2xl font-bold">{stats.totalBlogs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold">{stats.pendingReview}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published This Month</p>
                  <p className="text-2xl font-bold">{stats.publishedThisMonth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Authors</p>
                  <p className="text-2xl font-bold">{stats.totalAuthors}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Pending Review ({pendingBlogs.length})</span>
            </TabsTrigger>
            <TabsTrigger value="published" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Published ({mockPublishedBlogs.length})</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingBlogs.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pendingBlogs.map(blog => (
                  <PendingBlogCard 
                    key={blog.id} 
                    blog={blog} 
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No blog posts pending review.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockPublishedBlogs.map(blog => (
                <PublishedBlogCard 
                  key={blog.id} 
                  blog={blog} 
                  onHide={handleHide}
                  onUnhide={handleUnhide}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Views</span>
                    <span className="font-semibold">{stats.totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Read Time</span>
                    <span className="font-semibold">{stats.averageReadTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Authors</span>
                    <span className="font-semibold">{stats.totalAuthors}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["React", "JavaScript", "Node.js", "TypeScript", "CSS"].map((category, index) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full primary-gradient" 
                            style={{ width: `${100 - index * 15}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{25 - index * 3}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}