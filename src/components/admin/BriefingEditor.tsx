import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Briefing } from "@/hooks/useBriefings";

interface BriefingEditorProps {
  briefing?: Briefing;
  onSuccess?: () => void;
}

const BriefingEditor = ({ briefing, onSuccess }: BriefingEditorProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    briefing?.scheduled_publish_at ? new Date(briefing.scheduled_publish_at) : undefined
  );

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: briefing?.title || "",
      slug: briefing?.slug || "",
      summary: briefing?.summary || "",
      content: briefing?.content || "",
      seo_title: briefing?.seo_title || "",
      seo_description: briefing?.seo_description || "",
      keywords: briefing?.keywords?.join(", ") || "",
      category: briefing?.category || "Intelligence Report",
      geo_tags: briefing?.geo_tags?.join(", ") || "",
      publish_geo: briefing?.publish_geo || "",
      featured_image: briefing?.featured_image || "",
      status: briefing?.status || "draft",
    }
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      const briefingData = {
        ...data,
        keywords: data.keywords.split(",").map((k: string) => k.trim()).filter(Boolean),
        geo_tags: data.geo_tags.split(",").map((g: string) => g.trim()).filter(Boolean),
        scheduled_publish_at: scheduledDate?.toISOString() || null,
        published_at: data.status === "published" && !briefing?.published_at ? new Date().toISOString() : briefing?.published_at,
        slug: data.slug || generateSlug(data.title),
      };

      if (briefing?.id) {
        const { error } = await supabase
          .from("briefings")
          .update(briefingData)
          .eq("id", briefing.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Briefing updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("briefings")
          .insert([briefingData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Briefing created successfully",
        });
      }

      onSuccess?.();
      navigate("/admin/briefings");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleValue = watch("title");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
          <TabsTrigger value="publishing">Publishing</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Main Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Critical: 6 AI Tools Weaponized by Cybercriminals in 2025"
                  onBlur={(e) => {
                    if (!watch("slug")) {
                      setValue("slug", generateSlug(e.target.value));
                    }
                  }}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  {...register("slug", { required: "Slug is required" })}
                  placeholder="ai-tools-weaponized-cybercriminals-2025"
                />
                {errors.slug && (
                  <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="summary">Short Summary (2-line snippet) *</Label>
                <Textarea
                  id="summary"
                  {...register("summary", { required: "Summary is required" })}
                  placeholder="Criminal networks leverage AI tools to automate fraud. Generative-AI platforms weaponized to produce phishing texts."
                  rows={3}
                />
                {errors.summary && (
                  <p className="text-sm text-destructive mt-1">{errors.summary.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="content">Full Briefing Text (700-900 words) *</Label>
                <Textarea
                  id="content"
                  {...register("content", { required: "Content is required" })}
                  placeholder="Include Geo, Threat Summary, Key Developments, National Impact, Proactive Defense Blueprint, Strategic Outlook, and Attribution..."
                  rows={20}
                  className="font-mono text-sm"
                />
                {errors.content && (
                  <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  {...register("featured_image")}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO & Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo_title">SEO Title *</Label>
                <Input
                  id="seo_title"
                  {...register("seo_title", { required: "SEO title is required" })}
                  placeholder="Stolen Nation | Fake DMV Text Scams | Dr. Troy Williams, PhD – The AI PI"
                />
                {errors.seo_title && (
                  <p className="text-sm text-destructive mt-1">{errors.seo_title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="seo_description">SEO Description *</Label>
                <Textarea
                  id="seo_description"
                  {...register("seo_description", { required: "SEO description is required" })}
                  placeholder="Tennessee officials warn of fraudulent text messages impersonating DMV offices..."
                  rows={3}
                />
                {errors.seo_description && (
                  <p className="text-sm text-destructive mt-1">{errors.seo_description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (comma-separated) *</Label>
                <Input
                  id="keywords"
                  {...register("keywords", { required: "At least one keyword is required" })}
                  placeholder="consumer fraud, Tennessee, DMV scam, SMS phishing, cybersecurity"
                />
                {errors.keywords && (
                  <p className="text-sm text-destructive mt-1">{errors.keywords.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={watch("category")}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Intelligence Report">Intelligence Report</SelectItem>
                    <SelectItem value="AI Threats">AI Threats</SelectItem>
                    <SelectItem value="Consumer Fraud">Consumer Fraud</SelectItem>
                    <SelectItem value="Business Fraud">Business Fraud</SelectItem>
                    <SelectItem value="Financial Fraud">Financial Fraud</SelectItem>
                    <SelectItem value="Authentication">Authentication</SelectItem>
                    <SelectItem value="Business Security">Business Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="geo_tags">Geo Tags (comma-separated) *</Label>
                <Input
                  id="geo_tags"
                  {...register("geo_tags")}
                  placeholder="Tennessee, Lebanon TN, Nashville TN, Memphis TN"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Used for location-based filtering
                </p>
              </div>

              <div>
                <Label htmlFor="publish_geo">Publish Geo</Label>
                <Input
                  id="publish_geo"
                  {...register("publish_geo")}
                  placeholder="Tennessee, United States"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publishing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={watch("status")}
                  onValueChange={(value) => setValue("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Schedule Publish (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, "PPP 'at' p") : "Pick a date and time"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-muted-foreground mt-1">
                  Example: 8:30 AM Central Time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#3C3B6E] hover:bg-[#2d2c54]"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {briefing ? "Update Briefing" : "Create Briefing"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/briefings")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BriefingEditor;
