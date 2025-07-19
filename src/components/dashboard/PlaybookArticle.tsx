import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, Clock, Share2, User, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  image2: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Mastering the Sales Funnel: A Complete Guide",
    excerpt:
      "Learn how to optimize each stage of your sales funnel for maximum conversion rates and revenue growth.",
    content:
      "A sales funnel is a visual representation of the customer journey from initial awareness to final purchase. Understanding and optimizing each stage is crucial for business success...",
    date: "2025-01-15",
    category: "Sales Strategy",
    readTime: "8 min read",
    image: "/images/funnel.jpg",
    image2: "",
  },
  {
    id: "2",
    title: "The AIDA Model: Attention, Interest, Desire, Action",
    excerpt:
      "Discover how to apply the classic AIDA framework to create compelling sales messages that convert.",
    content:
      "The AIDA model is a foundational marketing framework that guides how to structure persuasive messages. It stands for Attention, Interest, Desire, and Action...",
    date: "2025-01-10",
    category: "Marketing",
    readTime: "6 min read",
    image: "/images/aida.jpg",
    image2: "",
  },
  {
    id: "3",
    title: "Building Your Ideal Sales Leads Database",
    excerpt:
      "Step-by-step guide to creating and maintaining a high-quality leads database that drives results.",
    content:
      "A well-organized leads database is the foundation of successful sales operations. Learn how to structure, populate, and maintain your database...",
    date: "2025-01-08",
    category: "Lead Generation",
    readTime: "10 min read",
    image: "/images/db.jpg",
    image2: "",
  },
  {
    id: "4",
    title: "How to Measure Outreach Success: Key Metrics & KPIs",
    excerpt:
      "Essential metrics and analytics to track your outreach performance and improve your results.",
    content:
      "Measuring outreach success requires tracking the right metrics. From open rates to conversion rates, learn which KPIs matter most...",
    date: "2025-01-05",
    category: "Analytics",
    readTime: "7 min read",
    image: "/images/emails.png",
    image2: "",
  },
  {
    id: "5",
    title: "Inbound vs Outbound Sales: Choosing the Right Strategy",
    excerpt:
      "Compare inbound and outbound sales approaches to determine the best strategy for your business.",
    content:
      "Understanding the differences between inbound and outbound sales is crucial for developing an effective sales strategy...",
    date: "2025-01-03",
    category: "Sales Strategy",
    readTime: "9 min read",
    image: "/images/socmedia.jpg",
    image2: "",
  },
  {
    id: "6",
    title: "Cold vs Hot Sales: Temperature-Based Lead Management",
    excerpt:
      "Learn how to identify and handle cold and hot leads differently for better conversion rates.",
    content:
      "Lead temperature is a crucial factor in sales success. Understanding how to approach cold versus hot leads can dramatically improve your conversion rates...",
    date: "2025-01-01",
    category: "Lead Management",
    readTime: "8 min read",
    image: "/images/calls.jpg",
    image2: "",
  },
  {
    id: "7",
    title: "Paid Marketing: Maximizing ROI on Ad Spend",
    excerpt:
      "Strategies for creating profitable paid marketing campaigns that generate quality leads.",
    content:
      "Paid marketing can be a powerful tool for lead generation when executed correctly. Learn how to optimize your campaigns for maximum ROI...",
    date: "2025-07-15",
    category: "Marketing",
    readTime: "11 min read",
    image: "/images/paid.jpg",
    image2: "",
  },
];

export const PlaybookArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const foundArticle = articles.find((a) => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
    } else {
      navigate("/dashboard/playbooks");
    }
  }, [id, navigate]);

  const handleShare = () => {
    if (article) {
      const articleUrl = `${window.location.origin}/dashboard/playbook/${article.id}`;
      navigator.clipboard.writeText(articleUrl);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to your clipboard.",
      });
      alert("Link copied!");
    }
  };

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Article not found</h2>
          <p className="text-muted-foreground mb-4">
            The article you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/dashboard/playbooks")}>
            Back to Playbooks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src="/images/outreach.png"
                  alt="Logo"
                  className="w-12 h-12"
                />
                <span className="font-bold text-lg">StellarReach</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <article className="space-y-8">
          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{article.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">StellarReach Team</p>
                  <p className="text-sm text-muted-foreground">
                    Sales & Marketing Experts
                  </p>
                </div>
              </div>

              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none space-y-6">
            <h2>Introduction</h2>

            <p>{article.content}</p>

            {/* <img
              src={article.image2}
              alt="Placeholder Image"
              className="w-full rounded-md"
            /> */}

            <h2>Key Takeaways</h2>

            <ul>
              <li>Understand the importance of a well-defined sales funnel.</li>
              <li>
                Learn how to apply the AIDA model to create compelling sales
                messages.
              </li>
              <li>Build and maintain a high-quality leads database.</li>
              <li>
                Track essential metrics and KPIs to measure outreach success.
              </li>
              <li>Choose the right sales strategy: inbound vs outbound.</li>
            </ul>

            <h2>Conclusion</h2>

            <p>
              By implementing these strategies, you can significantly improve
              your sales performance and achieve your business goals.
            </p>
          </div>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">
                Continue with StellarReach
              </h3>
              <p className="text-muted-foreground mb-4">
                Ready to implement these strategies? Start building your sales
                pipeline with our comprehensive tools.
              </p>
              <Button size="lg" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <img
                src="/images/outreach.png"
                alt="Logo"
                className="w-12 h-12"
              />
              <span className="font-semibold">StellarReach</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 StellarReach. Empowering teams with intelligent outreach
              solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
