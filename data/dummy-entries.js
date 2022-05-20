const DUMMY_ENTRIES = [
  {
    id: 'nytbestsellers',
    title: 'Books - NYT Best Sellers List',
    description: 'Book, books and more books!',
    date: '2021-05-12',
    lob: 'books',
    project: 'newreleases',
    campaign: 'nytbestsellers',
    isFeatured: false,
  },
  {
    id: 'wordmark',
    title: 'Music - Wordmark Value Props',
    description: 'Music, music and more music!',
    date: '2021-05-30',
    lob: 'music',
    project: 'newreleases',
    campaign: 'wordmark',
    isFeatured: true,
  },
  {
    id: 'titlesandpartners',
    title: 'TV+ - Titles and Partners',
    description: 'TV, TV and more TV!',
    date: '2022-04-10',
    lob: 'tvplus',
    project: 'multititle',
    campaign: 'titlesandpartners',
    isFeatured: true,
  },
];

export function getFeaturedEntries() {
  return DUMMY_ENTRIES.filter((event) => event.isFeatured);
}

export function getAllEntries() {
  return DUMMY_ENTRIES;
}

export function getFilteredEntries(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEntries = DUMMY_ENTRIES.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEntries;
}

export function getEntryById(id) {
  return DUMMY_ENTRIES.find((event) => event.id === id);
}
