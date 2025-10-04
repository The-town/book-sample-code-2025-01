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

let searchRanges = [];

// コンテキスト取得リクエストを処理
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.ranges) {
    searchRanges = message.ranges; // 範囲データを保存
    sendResponse(getContexts(message.ranges));
  } else if (message.type === 'focusResult') {
    const rangeData = searchRanges[message.index];
    if (rangeData) {
      const nodes = getNodes();
      const range = document.createRange();
      
      // 開始位置の設定
      const startNode = nodes[rangeData.startTextNodePos];
      range.setStart(startNode, rangeData.startOffset);
      
      // 終了位置の設定
      const endNode = nodes[rangeData.endTextNodePos];
      range.setEnd(endNode, rangeData.endOffset);

      // 範囲を選択してスクロール
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      
      // スクロール処理
      const element = range.startContainer.parentElement;
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }
});