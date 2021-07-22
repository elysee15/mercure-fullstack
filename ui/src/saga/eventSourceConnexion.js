function createEventSourceConnection(source, ...topics) {
  const url = new URL(source);

  if (!topics.length) {
    throw new Error("Au minimum un topic est requis");
  }

  if (topics.length) {
    topics.forEach((topic) => url.searchParams.append("topic", topic));
  }

  const eventSource = new EventSource(url);
  return eventSource;
}

export default createEventSourceConnection;
