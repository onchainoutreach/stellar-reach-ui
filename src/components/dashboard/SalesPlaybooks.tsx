import { useState } from "react";
import {
  Search,
  Calendar,
  Share2,
  BookOpen,
  Download,
  Copy,
  Trash2,
  ChevronDown,
  Eye,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
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
    date: "2025-06-28",
    category: "Marketing",
    readTime: "11 min read",
    image: "/images/paid.jpg",
    image2: "",
  },
];

export const SalesPlaybooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [gtmStrategy, setGtmStrategy] = useState("");
  const [isGtmDialogOpen, setIsGtmDialogOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMarkdownPreview, setIsMarkdownPreview] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const MAX_CHARACTERS = 10000;
  const characterCount = gtmStrategy.length;
  const remainingCharacters = MAX_CHARACTERS - characterCount;

  const filteredArticles = articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const handleShare = (article: Article) => {
    const articleUrl = `${window.location.origin}/dashboard/playbook/${article.id}`;
    navigator.clipboard.writeText(articleUrl);
    toast({
      title: "Link copied!",
      description: "Article link has been copied to your clipboard.",
    });
    alert("Link copied!");
  };

  const handleSaveGtm = () => {
    // In a real app, this would save to a backend
    toast({
      title: "GTM Strategy saved!",
      description: "Your go-to-market strategy has been saved successfully.",
    });
    setIsGtmDialogOpen(false);
  };

  const handleCopyGtm = () => {
    navigator.clipboard.writeText(gtmStrategy);
    toast({
      title: "Strategy copied!",
      description: "GTM strategy has been copied to your clipboard.",
    });
  };

  const handleDownloadGtm = () => {
    const blob = new Blob([gtmStrategy], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gtm-strategy.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Download started!",
      description: "Your GTM strategy is being downloaded.",
    });
  };

  const handleClearGtm = () => {
    setGtmStrategy("");
    toast({
      title: "Strategy cleared!",
      description: "GTM strategy has been cleared.",
    });
  };

  const handleGtmStrategyChange = (value: string) => {
    if (value.length <= MAX_CHARACTERS) {
      setGtmStrategy(value);
    }
  };

  const renderMarkdownPreview = (text: string) => {
    // Simple markdown rendering for preview
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mb-2">$1</h3>')
      .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Sales Playbooks
          </h1>
          <p className="text-muted-foreground">
            Discover proven strategies from industry leaders in lead generation,
            outreach, sales, and marketing. Regularly updated article collection
            provides the insights you need to excel and become a recognized
            sales leader in your field.
          </p>
        </div>
      </div>

      {/* GTM Strategy Button and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Dialog open={isGtmDialogOpen} onOpenChange={setIsGtmDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="whitespace-nowrap">
              <BookOpen className="w-4 h-4 mr-2" />
              Your GTM Strategy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Your Go-To-Market Strategy</DialogTitle>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Current Project:{" "}
                  <span className="font-medium">StellarReach Demo</span>
                </p>
                <Collapsible
                  open={isDescriptionExpanded}
                  onOpenChange={setIsDescriptionExpanded}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isDescriptionExpanded ? "rotate-180" : ""
                      }`}
                    />
                    <span>What is a Go-To-Market Strategy?</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <p className="text-sm text-primary/90 leading-relaxed bg-primary/5 p-3 rounded-md">
                      It is a comprehensive roadmap that defines how your
                      product or service will reach customers and achieve market
                      success. This strategic framework encompasses market
                      positioning, target audience identification, pricing
                      strategies, promotional tactics, and distribution channels
                      to maximize market penetration and revenue growth.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="gtm-strategy" className="text-sm font-medium">
                    Strategy Plan (Markdown supported)
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMarkdownPreview(!isMarkdownPreview)}
                      className="text-xs"
                    >
                      {isMarkdownPreview ? (
                        <>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </>
                      )}
                    </Button>
                    <span
                      className={`text-xs ${
                        remainingCharacters < 100
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {characterCount.toLocaleString()}/
                      {MAX_CHARACTERS.toLocaleString()} characters
                    </span>
                  </div>
                </div>
                {isMarkdownPreview ? (
                  <div
                    className="h-[400px] overflow-y-auto p-3 border rounded-md bg-muted/30 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdownPreview(
                        gtmStrategy ||
                          "No content to preview yet. Switch back to edit mode to add your strategy."
                      ),
                    }}
                  />
                ) : (
                  <Textarea
                    id="gtm-strategy"
                    placeholder={`# Market Analysis Example

## Target Audience
Define your ideal customer profile...

## Competitive Landscape
Analyze key competitors and positioning...

## Go-to-Market Channels
- Sales
- Marketing
- Partner channels

## Pricing Strategy

## Launch Timeline

...
`}
                    value={gtmStrategy}
                    onChange={(e) => handleGtmStrategyChange(e.target.value)}
                    className="min-h-[400px] font-mono text-sm overflow-y-auto"
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleSaveGtm} disabled={!gtmStrategy.trim()}>
                  Save Strategy
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyGtm}
                  disabled={!gtmStrategy.trim()}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadGtm}
                  disabled={!gtmStrategy.trim()}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClearGtm}
                  disabled={!gtmStrategy.trim()}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="title-asc">Title A-Z</SelectItem>
            <SelectItem value="title-desc">Title Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Card
            key={article.id}
            className="hover:shadow-lg transition-shadow group"
          >
            <CardHeader className="p-0">
              <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(article.date)}
                </div>
              </div>

              <CardTitle
                className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                onClick={() => navigate(`/dashboard/playbook/${article.id}`)}
              >
                {article.title}
              </CardTitle>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {article.readTime}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(article);
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(`/dashboard/playbook/${article.id}`)
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <BookOpen className="w-12 h-12 mx-auto mb-2" />
            <p>No articles found matching your search.</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSortBy("date-desc");
            }}
          >
            Clear Search
          </Button>
        </div>
      )}

      {/* Footer Stats */}
      <div className="border-t pt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Showing {filteredArticles.length} of {articles.length} articles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
