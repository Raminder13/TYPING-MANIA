'use strict';

/* 
Raminder Singh
*/

class Score {
  #date;
  #hits;
  #percentage;

  constructor(hits, percentage) {
    this.#date = Date.now();
    this.#hits = hits;
    this.#percentage = percentage;
  }

  get date() {
    return this.#date;
  }

  get hits() {
    return this.#hits;
  }

  get percentage() {
    return this.#percentage.toFixed(2);
  }
}

export { Score };
