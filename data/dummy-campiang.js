const DUMMY_DATA = {
  meta: {
    id: 'voice',
    title: 'Voice',
    lob: { id: 'music', title: ' Music' },
    project: { id: 'newreleases', title: 'New Releases' },
    description: 'Book, books and more books!',
  },
  units: [
    {
      id: 'music-wordmark-newreleases-300x250-v1',
      size: '300x250',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: 'units/music/newreleases/music-wordmark-newreleases-300x250-v1',
    },
    {
      id: 'music-wordmark-newreleases-320x50-v1',
      size: '320x50',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: 'units/music/newreleases/music-wordmark-newreleases-320x50-v1',
    },
  ],
};

/* export function getFeaturedUnits() {
  return DUMMY_DATA.filter((event) => event.isFeatured);
} */

export function getAllUnits() {
  return DUMMY_DATA;
}

/* export function getFilteredEntries(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEntries = DUMMY_DATA.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEntries;
} */

export function getUnitById(id) {
  return DUMMY_DATA.find((unit) => unit.id === id);
}
