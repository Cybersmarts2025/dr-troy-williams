
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

interface BookItem {
  title: string;
  description: string;
  amazonUrl: string;
}

const books: BookItem[] = [
  {
    title: "The Future of AI in Cybersecurity",
    description: "A comprehensive guide to understanding how artificial intelligence is revolutionizing cyber defense strategies and threat detection.",
    amazonUrl: "https://amazon.com/author/troywilliams",
  },
  {
    title: "Digital Investigation Techniques",
    description: "Expert insights into modern digital forensics and investigation methodologies for cybersecurity professionals.",
    amazonUrl: "https://amazon.com/author/troywilliams",
  }
];

const Books = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <Helmet>
        <title>Books by Dr. Troy Williams - AI and Cybersecurity Publications</title>
        <meta 
          name="description" 
          content="Explore books authored by Dr. Troy Williams on artificial intelligence, cybersecurity, and investigative ethics. Essential reading for technology professionals." 
        />
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <Book className="h-8 w-8" />
          Books by Dr. Troy Williams
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover my published works on artificial intelligence, cybersecurity, and digital investigation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>{book.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Additional content like book cover could go here */}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Books;
