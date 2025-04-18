
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const WorkHistory = () => {
  return (
    <section className="py-16" id="work">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Work History</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span>Position Title</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Please provide your work history details to populate this section.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span>Previous Role</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Please provide your work history details to populate this section.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WorkHistory;
