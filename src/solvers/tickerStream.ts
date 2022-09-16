type Tick = {
  timestamp: string
  ticker: string
  quantity: number
  price: number
}

/**
 * Compares two timestamps with the format HH:MM
 * @returns - <0 if timestamp1 < timestamp2
 *          - \>0 if timestamp1 > timestamp2
 *          - 0  otherwise
 */
function compareTimestamps(timestamp1: string, timestamp2: string) {
  const [hour1, minute1] = timestamp1.split(':').map(x => Number.parseInt(x))
  const [hour2, minute2] = timestamp2.split(':').map(x => Number.parseInt(x))
  const time1 = hour1 * 60 + minute1;
  const time2 = hour2 * 60 + minute2;
  return time1 - time2;
}

/** Extracts tick information from "timestamp,ticker,quantity,price" */
function extractTick(data: string): Tick {
  const [timestamp, ticker, quantity, price] = data.split(',')
  return {
    timestamp,
    ticker,
    quantity: Number.parseInt(quantity),
    price: Number.parseFloat(price)
  }
}

export function tickerStreamPart1Solution(stream: string[]) {
  const ticks = stream.map(extractTick);
  ticks.sort((a, b) => compareTimestamps(a.timestamp, b.timestamp));

  // stores cumulative quantity and notional for each ticker
  const uniqueTickers = [...new Set(ticks.map(tick => tick.ticker))]
  const tickerData = Object.fromEntries(uniqueTickers.map(ticker => [ticker, {
    quantity: 0,
    notional: 0
  }]))

  // array of all output to return
  const output = [];
  // stores all tickers that have a tick in current timestamp
  const affectedTickers = new Set<string>();

  const formatTicker = (ticker: string) => {
    const data = tickerData[ticker];
    return `${ticker},${data.quantity.toString()},${data.notional.toFixed(1)}`
  }

  for (let i = 0; i < ticks.length; i++) {
    const tick = ticks[i];

    // update the cumulative quantity and notional
    tickerData[tick.ticker].quantity += tick.quantity;
    tickerData[tick.ticker].notional += tick.quantity * tick.price;
    affectedTickers.add(tick.ticker);

    // add new entry if this is last ticker in current timestamp
    if (i === ticks.length - 1 || ticks[i + 1].timestamp !== tick.timestamp) {
      // get tickers in alphabetical order
      const tickers = [...affectedTickers].sort((a, b) => a.localeCompare(b));
      // add new entry
      output.push(`${tick.timestamp},${tickers.map(formatTicker).join(',')}`);
      // reset affected tickers
      affectedTickers.clear();
    }
  }

  return output;
}

export function tickerStreamPart2Solution(stream: string[], quantityBlock: number) {
  const ticks = stream.map(extractTick);
  ticks.sort((a, b) => compareTimestamps(a.timestamp, b.timestamp));

  // stores cumulative quantity and notional for each ticker
  // as well as quantity and notional within the next block
  const uniqueTickers = [...new Set(ticks.map(tick => tick.ticker))]
  const tickerData = Object.fromEntries(uniqueTickers.map(ticker => [ticker, {
    quantity: 0,
    notional: 0,
    futureQuantity: 0,
    futureNotional: 0
  }]))

  // array of all output to return
  const output = [];
  // stores all tickers that have a tick in current timestamp
  const affectedTickers = new Set<string>();

  const formatTicker = (ticker: string) => {
    const data = tickerData[ticker];
    return `${ticker},${data.quantity.toString()},${data.notional.toFixed(1)}`
  }

  for (let i = 0; i < ticks.length; i++) {
    const tick = ticks[i];
    const data = tickerData[tick.ticker];

    // update the cumulative (and future) quantity and notional
    if (data.futureQuantity + tick.quantity >= quantityBlock) {
      data.quantity += data.futureQuantity;
      data.notional += data.futureNotional;
      data.futureQuantity = (tick.quantity + data.futureQuantity) % quantityBlock;
      data.futureNotional = data.futureQuantity * tick.price;
      data.quantity += (tick.quantity - data.futureQuantity);
      data.notional += (tick.quantity - data.futureQuantity) * tick.price;
      // ticker hit quantityBlock this timestamp
      affectedTickers.add(tick.ticker);
    } else {
      data.futureQuantity += tick.quantity;
      data.futureNotional += tick.quantity * tick.price;
    }

    // add new entry if this is last ticker in current timestamp
    if (i === ticks.length - 1 || ticks[i + 1].timestamp !== tick.timestamp) {
      if (affectedTickers.size === 0) continue;
      // get tickers in alphabetical order
      const tickers = [...affectedTickers].sort((a, b) => a.localeCompare(b));
      // add new entry
      output.push(`${tick.timestamp},${tickers.map(formatTicker).join(',')}`);
      // reset affected tickers
      affectedTickers.clear();
    }
  }

  return output;
}
