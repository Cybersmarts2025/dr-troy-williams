import { Helmet } from "react-helmet-async";

const aiTools = [
  {
    title: "AI Image Generation",
    description:
      "This tool generates professional, high quality images optimized for cybersecurity, technology, and business use cases. Images are produced using secure artificial intelligence models without third party branding or external platform attribution.",
  },
  {
    title: "AI Research Assistant",
    description:
      "An artificial intelligence powered research assistant designed to support cybersecurity analysis, technical documentation, and investigative workflows.",
  },
  {
    title: "Cybersecurity Consultation",
    description:
      "An artificial intelligence driven consultation assistant providing structured guidance across cybersecurity, fraud prevention, compliance, and risk analysis.",
  },
];

export default function AITools() {
  return (
    <>
      <Helmet>
        <title>AI Tools | Dr Troy Williams | Cybersmarts.ai</title>
        <meta
          name="description"
          content="Artificial intelligence tools for cybersecurity, fraud prevention, research, and professional image generation developed by Dr Troy Williams."
        />
        <meta
          name="keywords"
          content="artificial intelligence cybersecurity tools, AI cybersecurity assistant, cybersecurity research AI, professional AI image generation, Dr Troy Williams, Cybersmarts.ai"
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">
          Artificial Intelligence Tools
        </h1>

        <div className="grid gap-6">
          {aiTools.map((tool) => (
            <div
              key={tool.title}
              className="border rounded-lg p-6 bg-white shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
              <p className="text-gray-700">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
