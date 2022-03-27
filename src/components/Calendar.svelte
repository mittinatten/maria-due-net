<script lang="ts">
  import { Concert } from "../types";

  export let concerts: Concert[];

  function formatDate(date: Date) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
</script>

<h2>Calendar</h2>

<ul class="concerts">
  {#each concerts as concert}
    <li>
      <article>
        <div class="description">
          <h3>{concert.venue}</h3>
          <p>{concert.description}</p>
          <footer>
            <ul>
              {#if concert.tickets}
                <li><a href={concert.tickets} target="_blank">Tickets</a></li>
              {/if}
              {#if concert.eventURL}
                <li><a href={concert.eventURL}>Event</a></li>
              {/if}
              {#if concert.venueURL}
                <li><a href={concert.venueURL}>Venue</a></li>
              {/if}
            </ul>
          </footer>
        </div>
        <div class="date-and-city">
          <div class="date">{formatDate(concert.date)}</div>
          <div class="city">{concert.city}, {concert.country}</div>
        </div>
      </article>
    </li>
  {/each}
</ul>

<style>
  article {
    max-width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 16px;
  }

  .description {
    flex: 1;
    min-width: 150px;
  }

  .date-and-city {
    width: clamp(150px, 250px, 30%);
  }

  .date {
    font-size: calc((20 / 16) * 1rem);
  }
  .city {
    font-size: calc((14 / 16) * 1rem);
    text-transform: uppercase;
    opacity: 0.6;
    margin-top: 0.2rem;
  }

  .description footer {
    margin-top: 8px;
  }

  ul {
    position: relative;
  }
  footer li {
    display: inline-block;
    font-size: calc((14 / 16) * 1rem);
    vertical-align: middle;
    line-height: 1;
  }

  footer li:not(:last-child) {
    border-right: 1px solid var(--color-text);
  }

  footer li:first-child {
    margin-left: -8px;
  }

  footer li a {
    display: block;
    padding: 4px 8px;
  }
</style>
