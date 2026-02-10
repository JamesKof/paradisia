

## Add TikTok Video Slider to the Website

### What will be built
A new sliding card section that showcases TikTok videos from `@paradasia.hideway`, replacing the existing YouTube-based `VideoShortsSlider` component. The cards will auto-scroll horizontally and open TikTok videos when clicked.

### Approach
Since TikTok does not allow fetching recent videos without an API key, the section will feature a curated set of TikTok video embeds using TikTok's embed iframe. Each card will display a thumbnail from the existing property photos, and clicking a card will open the TikTok video in a modal using TikTok's embed player. The "View All" link will point to the TikTok profile.

### Changes

**1. Update `src/components/VideoShortsSlider.tsx`**
- Replace the YouTube video IDs with TikTok video URLs from `@paradasia.hideway`
- Update the "View All" link from YouTube to `https://www.tiktok.com/@paradasia.hideway`
- Change the modal embed from YouTube iframe to TikTok embed iframe (using `https://www.tiktok.com/embed/v2/{videoId}`)
- Update section header text to reference TikTok (e.g., "Follow Us on TikTok")
- Add a TikTok icon badge on each card

**2. Update `src/pages/Index.tsx`**
- Import and add the `VideoShortsSlider` component to the page (it currently exists but is not rendered)
- Place it between the Explore and Contact sections, wrapped in a `RevealSection`

### Technical Details
- TikTok embeds use the format: `https://www.tiktok.com/embed/v2/{videoId}`
- The video IDs will need to be manually curated from the TikTok profile since there's no public API to auto-fetch them
- The existing `animate-scroll` CSS animation (30s infinite loop) and pause-on-hover behavior will be reused
- The 9:16 aspect ratio cards are already perfect for TikTok's vertical video format
- The duplicate-array technique for seamless looping is already in place

