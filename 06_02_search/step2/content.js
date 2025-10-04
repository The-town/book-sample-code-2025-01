/**
 * Get all the text nodes into a single array
 */
function getNodes() {
  let walker = document.createTreeWalker(
    document,
    window.NodeFilter.SHOW_TEXT,
    null,
    false,
  );
  let nodes = [];
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }

  return nodes;
}

/**
 * Gets all text nodes in the document, then for each match, return the
 * complete text content of nodes that contained the match.
 * If a match spanned more than one node, concatenate the textContent
 * of each node.
 */
function getContexts(ranges) {
  let contexts = [];
  let nodes = getNodes();

  for (let range of ranges) {
    let context = nodes[range.startTextNodePos].textContent;
    let pos = range.startTextNodePos;
    while (pos < range.endTextNodePos) {
      pos++;
      context += nodes[pos].textContent;
    }
    contexts.push(context);
  }
  return contexts;
}

// コンテキスト取得リクエストを処理
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.ranges) {
    sendResponse(getContexts(message.ranges));
  } 
});