import { useState } from "react";
import { BlogCard } from "@/components/Blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, Sparkles } from "lucide-react";

// Mock data
const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with React Server Components",
    excerpt: "Learn how to use React Server Components to build faster, more efficient web applications with better SEO and performance.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100" },
    publishedAt: "2024-01-15",
    tags: ["React", "JavaScript", "Frontend"],
    likes: 124,
    comments: 18,
    views: 2341,
    isLiked: false
  },
  {
    id: "2",
    title: "Building Scalable APIs with Node.js and Express",
    excerpt: "A comprehensive guide to creating robust, scalable APIs using Node.js, Express, and modern best practices for backend development.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    publishedAt: "2024-01-12",
    tags: ["Node.js", "API", "Backend"],
    likes: 89,
    comments: 12,
    views: 1876,
    isLiked: true
  },
  {
    id: "3",
    title: "The Future of Web Development: AI and Machine Learning Integration",
    excerpt: "Exploring how artificial intelligence and machine learning are reshaping the web development landscape and what developers need to know.",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: { name: "Dr. Emily Watson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    publishedAt: "2024-01-10",
    tags: ["AI", "Machine Learning", "Future Tech"],
    likes: 201,
    comments: 34,
    views: 4523,
    isLiked: false
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox: When to Use Each",
    excerpt: "A detailed comparison of CSS Grid and Flexbox, including practical examples and best practices for layout design.",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    publishedAt: "2024-01-08",
    tags: ["CSS", "Layout", "Design"],
    likes: 67,
    comments: 9,
    views: 1234,
    isLiked: false
  },
  {
    id: "5",
    title: "Mastering TypeScript: Advanced Types and Patterns",
    excerpt: "Deep dive into TypeScript's advanced features, including utility types, conditional types, and design patterns for type-safe applications.",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: { name: "Lisa Park", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
    publishedAt: "2024-01-05",
    tags: ["TypeScript", "JavaScript", "Programming"],
    likes: 156,
    comments: 23,
    views: 2987,
    isLiked: true
  }
];

const categories = [
  "All",
  "React",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "CSS",
  "Backend",
  "Frontend",
  "AI",
  "Design"
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("latest");

  const filteredBlogs = selectedCategory === "All" 
    ? mockBlogs 
    : mockBlogs.filter(blog => blog.tags.includes(selectedCategory));

  const featuredBlog = mockBlogs[0];
  const trendingBlogs = mockBlogs.slice(1, 4);
  const latestBlogs = mockBlogs.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container relative">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome to{" "}
              <span className="text-gradient">The Writers' Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover, learn, and share knowledge with our community of developers. 
              From tutorials to industry insights, find everything you need to level up your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Start Reading
              </Button>
              <Button size="lg" variant="outline">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 hover-scale"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="featured" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>Featured</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="latest" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Latest</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Featured Article</h2>
              <p className="text-muted-foreground">Hand-picked content from our editors</p>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <BlogCard {...featuredBlog} variant="featured" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">More Featured</h3>
                {trendingBlogs.slice(0, 3).map((blog) => (
                  <BlogCard key={blog.id} {...blog} variant="compact" />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Trending Posts</h2>
              <p className="text-muted-foreground">Most popular articles this week</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trendingBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="latest" className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Latest Articles</h2>
              <p className="text-muted-foreground">Fresh content from our community</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
            
            {filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found for this category.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory("All")}
                  className="mt-4"
                >
                  Show All Articles
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}