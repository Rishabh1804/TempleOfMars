<script lang="ts">
  interface Props { name: string; size?: number; class?: string; }
  let { name, size = 20, class: klass = '' }: Props = $props();

  const paths: Record<string, string> = {
    sword: 'M14.5 17.5 3 6V3h3l11.5 11.5 M13 19l6-6 M16 16l4 4 M19 21l2-2 M15 5l4-4 5 5-4 4',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    sun: 'M12 3v2 M12 19v2 M5 12H3 M21 12h-2 M6.3 6.3 4.9 4.9 M19.1 19.1l-1.4-1.4 M6.3 17.7l-1.4 1.4 M19.1 4.9l-1.4 1.4 M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
    moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
    clock: 'M12 7v5l3 2 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    refresh: 'M21 3v5h-5 M3 21v-5h5 M21 8A9 9 0 0 0 6 5.3 M3 16a9 9 0 0 0 15 2.7',
    eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
    flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7',
    check: 'M20 6 9 17l-5-5',
    alert: 'M12 9v4 M12 17h.01 M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z',
    target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    trending: 'M22 7l-8.5 8.5-5-5L2 17 M16 7h6v6',
    circle: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    'arrow-right': 'M5 12h14 M12 5l7 7-7 7',
    menu: 'M4 6h16 M4 12h16 M4 18h16',
    'text-scale': 'M4 7V4h16v3 M9 20h6 M12 4v16',
    github: 'M9 19c-5 1.5-5-2.5-7-3 M15 22v-4a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 3.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.13V23'
  };

  const d = $derived(paths[name] ?? paths.circle);
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={klass}
  aria-hidden="true"
>
  <path d={d} />
</svg>
