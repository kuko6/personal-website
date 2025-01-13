<script>
  import Project from "../../components/Project.svelte";

  const project = [
    {
      name: "Nix Experiments",
      description: "Collection of dev environments and system configurations written in Nix.",
      ref: "https://github.com/kuko6/nix-config",
      used_tech: ["Nix", "Unix"]
    },
    {
      name: "Click correction",
      description: `Method for Segmentation of Vestibular Schwannomas from Brain MRI Scans. The method is based on an auxilarly correction network, which utilises user-defined clicks to refines inaccurate segmentation.`,
      ref: "https://github.com/kuko6/click-correction",
      used_tech: ["Pytorch", "OpenCV", "AzureML", "Docker"],
    },
    {
      name: "Style transfer",
      description:
        "Pytorch implementation of style transfer based on the Adaptive Instance Normalization.",
      ref: "https://github.com/kuko6/style-transfer",
      used_tech: ["Pytorch", "Gradio"],
    },
    {
      name: "Various computer vision assignments",
      description:
        "Collection of various computer vision assignments (contour analysis, image correction, segmentation and classification).",
      ref: "https://github.com/kuko6/cv-assignments",
      used_tech: ["Pytorch", "OpenCV"],
    },
    {
      name: "Rezervi",
      description:
        "Mobile app for a room reservation system. Allows users to view, create or edit room reservations aswell as to create listings for new rooms. The app also includes a custom chating service, which enables direct communication between users and room owner.",
      ref: "https://github.com/mtaa-rezervi",
      used_tech: [
        "Node.js",
        "MongoDB",
        "Express",
        "React-native",
        "Expo",
        "WebSockets",
      ],
    },
    {
      name: "Application for management of scientific research projects",
      description:
        "Team project for the Slovak Center of Scientific and Technical Information. The application aimed to improve registration, monitoring, and overall management of research projects. Our team contributed to both the frontend and backend development of the application.",
      ref: "javascript:void(0)",
      used_tech: [
        "Node.js",
        "React",
        "Next.js",
        "Django",
        "PostgreSQL",
        "Docker",
      ],
    },
  ];
</script>

<svelte:head>
  <title>Projects - Kuko</title>
</svelte:head>
<div class="space-y-6 dark:text-white">
  <h1 class="font-inter font-black text-2xl md:text-4xl">Projects</h1>
  <div class="flex flex-col gap-3">
    {#each project as p}
      <Project project={p} />
    {/each}
  </div>
</div>
