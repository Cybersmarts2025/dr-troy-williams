
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Calendar, ExternalLink, Trash2 } from 'lucide-react';

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Bookmarks | Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="View and manage your saved articles and resources from Dr. Troy Williams." 
        />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="My Bookmarks" />
        
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">My Bookmarks</h1>
              <p className="text-xl text-muted-foreground">
                Keep track of your favorite articles and resources.
              </p>
            </div>
            
            {bookmarks.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <h3 className="text-xl font-semibold mb-2">No bookmarks yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start saving articles and resources by clicking the bookmark button.
                  </p>
                  <Button asChild>
                    <Link to="/blog">Browse Articles</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookmarks.map((bookmark) => (
                  <Card key={bookmark.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg">
                              <Link 
                                to={bookmark.url} 
                                className="hover:text-primary transition-colors"
                              >
                                {bookmark.title}
                              </Link>
                            </CardTitle>
                            <Badge variant="outline">
                              {bookmark.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Saved {new Date(bookmark.addedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={bookmark.url}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeBookmark(bookmark.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Bookmarks;
