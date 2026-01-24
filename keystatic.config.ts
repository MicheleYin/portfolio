import { config, fields, collection, singleton } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";

export default config({
  storage: import.meta.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
    ? {
      kind: "github",
      repo: {
        owner: import.meta.env.PUBLIC_KEYSTATIC_REPO_OWNER!,
        name: import.meta.env.PUBLIC_KEYSTATIC_REPO_NAME!,
      },
    }
    : {
      kind: "local",
    },

  singletons: {
    hero: singleton({
      label: "Hero Section",
      path: "src/content/hero/",
      schema: {
        name: fields.text({
          label: "Name",
          description: "Your name or site name",
        }),
        title: fields.text({
          label: "Title",
          description: "Main headline/tagline",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "Hero section description",
        }),
        avatar: fields.image({
          label: "Avatar",
          directory: "src/assets/hero",
          publicPath: "@assets/hero/",
        }),
        location: fields.text({
          label: "Location",
          description: 'e.g., "🇧🇷 Brazil"',
        }),
        githubUrl: fields.url({
          label: "GitHub URL",
          description: "Your GitHub profile URL",
        }),
        linkedinUrl: fields.url({
          label: "LinkedIn URL",
          description: "Your LinkedIn profile URL",
        }),
        twitterUrl: fields.url({
          label: "Twitter/X URL",
          description: "Your Twitter/X profile URL",
        }),
        blueskyUrl: fields.url({
          label: "Bluesky URL",
          description: "Your Bluesky profile URL",
        }),
        instagramUrl: fields.url({
          label: "Instagram URL",
          description: "Your Instagram profile URL",
        }),
        youtubeUrl: fields.url({
          label: "YouTube URL",
          description: "Your YouTube channel URL",
        }),
        codetipsUrl: fields.url({
          label: "CodeTips URL",
          description: "Your CodeTips profile URL",
        }),
      },
    }),

    about: singleton({
      label: "About",
      path: "src/content/about/",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.text({
          label: "Title",
          description: "About section title",
        }),
        photo: fields.image({
          label: "Photo",
          directory: "src/assets/about",
          publicPath: "@assets/about/",
          description: "Your photo for the about section",
        }),
        content: fields.markdoc({
          label: "Content",
          description: "About section content (supports Markdown)",
          extension: "md",
        }),
      },
    }),
  },

  collections: {
    work: collection({
      label: "Work Experience",
      path: "src/content/work/*",
      slugField: "title",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: { label: "Company Name" },
        }),
        subtitle: fields.text({
          label: "Position",
          description: "Job title/role",
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: "End Date",
          description: "Leave empty if current position",
        }),
        logo: fields.image({
          label: "Company Logo",
          directory: "src/assets/work",
          publicPath: "@assets/work/",
          description: "Optional company logo",
        }),
        link: fields.url({
          label: "Company Website",
          description: "Optional link to company website",
        }),
        content: fields.markdoc({
          label: "Description",
          description: "Job responsibilities and achievements",
          extension: "md",
        }),
      },
    }),

    education: collection({
      label: "Education",
      path: "src/content/education/*",
      slugField: "title",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: { label: "Institution Name" },
        }),
        subtitle: fields.text({
          label: "Degree/Course",
          description: 'e.g., "Bachelor of Computer Science"',
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: "End Date",
          description: "Leave empty if ongoing",
        }),
        logo: fields.image({
          label: "Institution Logo",
          directory: "src/assets/education",
          publicPath: "@assets/education/",
          description: "Optional institution logo",
        }),
        link: fields.url({
          label: "Institution Website",
          description: "Optional link to institution website",
        }),
        content: fields.markdoc({
          label: "Description",
          description: "Education details and achievements",
          extension: "md",
        }),
      },
    }),

    projects: collection({
      label: "Projects",
      path: "src/content/projects/*",
      slugField: "title",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: { label: "Project Name" },
        }),
        description: fields.text({
          label: "Short Description",
          multiline: true,
          description: "Brief project summary for cards",
        }),
        image: fields.image({
          label: "Project Image",
          directory: "src/assets/projects",
          publicPath: "@assets/projects/",
          validation: { isRequired: true },
          description: "Main project image",
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: "End Date",
          description: "Leave empty if ongoing",
        }),
        skills: fields.array(fields.text({ label: "Skill" }), {
          label: "Skills/Technologies",
          itemLabel: (props) => props.value,
          description: "Technologies and tools used in this project",
        }),
        downloadLink: fields.url({
          label: "Demo Link",
          description: "Live demo URL (optional)",
        }),
        sourceLink: fields.url({
          label: "Source Code Link",
          description: "GitHub or repository URL (optional)",
        }),
        content: fields.markdoc({
          label: "Full Description",
          description: "Detailed project information",
          extension: "md",
          options: {
            image: {
              directory: "src/assets/projects",
              publicPath: "@assets/projects/",
            },
          },
          components: {
            Spotify: block({
              label: "Spotify Playlist",
              schema: {
                url: fields.text({ label: "Playlist ID" }),
              },
            }),
          },
        }),
      },
    }),

    blog: collection({
      label: "Blog Posts",
      path: "src/content/blog/**",
      slugField: "title",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: { label: "Post Title" },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "SEO description and excerpt",
        }),
        image: fields.image({
          label: "Cover Image",
          directory: "src/assets/blog",
          publicPath: "@assets/blog/",
          validation: { isRequired: true },
          description: "Blog post cover image",
        }),
        publishDate: fields.date({
          label: "Publish Date",
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: "Updated Date",
          description: "Last update date (optional)",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
          description: "Blog post tags",
        }),
        content: fields.markdoc({
          label: "Content",
          description: "Blog post content",
          options: {
            image: {
              directory: "src/assets/blog",
              publicPath: "@assets/blog/",
            },
          },
          components: {
            Spotify: block({
              label: "Spotify Embed",
              schema: {
                url: fields.text({
                  label: "Spotify URL",
                  description:
                    "Full Spotify URL (track, album, playlist, or podcast)",
                  validation: { isRequired: true },
                }),
              },
            }),
            YouTube: block({
              label: "YouTube Video",
              schema: {
                id: fields.text({
                  label: "Video ID",
                  description: "YouTube video ID (optional if URL is provided)",
                }),
                url: fields.text({
                  label: "YouTube URL",
                  description: "Full YouTube URL (optional if ID is provided)",
                }),
              },
            }),
            Twitter: block({
              label: "Twitter/X Embed",
              schema: {
                url: fields.text({
                  label: "Tweet URL",
                  description: "Full Twitter/X URL",
                }),
                id: fields.text({
                  label: "Tweet ID",
                  description: "Tweet ID (optional if URL is provided)",
                }),
                username: fields.text({
                  label: "Username",
                  description: "Twitter username (optional if URL is provided)",
                }),
              },
            }),
          },
        }),
      },
    }),

    hackathons: collection({
      label: "Hackathons",
      path: "src/content/hackathons/*",
      slugField: "title",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: { label: "Hackathon Name" },
        }),
        location: fields.text({
          label: "Location",
          description: 'City, venue, or "Virtual"',
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "Brief hackathon summary",
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: "End Date",
          description: "Last day of event (optional)",
        }),
        logo: fields.image({
          label: "Event Logo",
          directory: "src/assets/hackathons",
          publicPath: "@assets/hackathons/",
          description: "Optional event logo",
        }),
        sourceLink: fields.url({
          label: "Project Link",
          description: "GitHub repo or project URL (optional)",
        }),
        content: fields.markdoc({
          label: "Full Description",
          description: "Detailed information about the hackathon and project",
          extension: "md",
        }),
      },
    }),
    publications: collection({
      label: "Publications",
      path: "src/content/publications/*",
      slugField: "title",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: { label: "Paper Title" },
        }),
        subtitle: fields.text({
          label: "Journal/Conference",
          description: 'e.g., "Interspeech 2024"',
        }),
        startDate: fields.date({
          label: "Publication Date",
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: "End Date (Optional)",
          description: "Optional, usually not needed for publications",
        }),
        logo: fields.image({
          label: "Publication Logo/Icon",
          directory: "src/assets/publications",
          publicPath: "@assets/publications/",
          description: "Optional publication logo",
        }),
        link: fields.url({
          label: "Paper Link",
          description: "Link to the paper or DOI",
        }),
        content: fields.markdoc({
          label: "Abstract/Description",
          description: "Brief summary of the paper",
          extension: "md",
        }),
      },
    }),
  },
});
