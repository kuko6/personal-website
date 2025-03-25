<script>
  import Project from "../../components/Project.svelte";

  const project = [
    {
      name: "Simple Pixelart Filter",
      description:
        "An app that allows you to pixelate images, quantize colors and display color palettes.",
      ref: "https://github.com/kuko6/pixel-filter",
      used_tech: ["Python", "OpenCV", "Gradio"],
    },
    {
      name: "Nix Experiments",
      description:
        "Collection of dev environments and system configurations written in Nix.",
      ref: "https://github.com/kuko6/nix-config",
      used_tech: ["Nix", "Unix"],
    },
    {
      name: "Advent of Code 2024",
      description:
        "Solutions for Advent of Code in TypeScript.",
      ref: "https://github.com/kuko6/aoc24",
      used_tech: ["Deno", "TypeScript"],
    },
    {
      name: "Click Correction",
      description:
        "Method for Segmentation of Vestibular Schwannomas from Brain MRI Scans. The method is based on an auxilarly correction network, which utilises user-defined clicks to refines inaccurate segmentation.",
      ref: "https://github.com/kuko6/click-correction",
      used_tech: ["Pytorch", "OpenCV", "AzureML", "Docker"],
    },
    {
      name: "Style Transfer",
      description:
        "Implementation of style transfer using Adaptive Instance Normalization (AdaIN) with a VGG-19-based architecture, trained on WikiArt and COCO datasets.",
      ref: "https://github.com/kuko6/style-transfer",
      used_tech: ["Pytorch", "Gradio"],
    },
    {
      name: "Various Computer Vision Assignments",
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
      name: "Application for Management of Scientific Research Projects",
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
  <title>Projects - Jakub Povinec</title>
</svelte:head>
<div class="space-y-5">
  <h1 class=""><span class="rotated-underline">Projects</span></h1>
  <div class="flex flex-col gap-3">
    <!-- {#each project as p}
      <Project project={p} />
    {/each} -->
    <ul class="list-disc mx-6 space-y-2">
      {#each project as p}
        <li class="">
          <a class="project text-indigo-500 dark:text-indigo-400" href={p.ref}>
            [{p.name}]
          </a>
          - {p.description}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .project {
    
  }

  .project:hover {
    @apply bg-indigo-500 text-white py-0.5;
  }

  /* .rotated-underline {
    @apply relative;
  }
  
  .rotated-underline::after {
    @apply absolute left-0 bottom-[-2px] w-full h-[6px] bg-current text-indigo-400;
    content: '';
    transform: rotate(-2.5deg);
    transform-origin: right bottom;
  } */

</style>