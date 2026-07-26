# Project Yelp Clone

Yelp-style local discovery frontend built with React + Vite and dummy listing data.

## Live site

https://wats3082.github.io/Project-Yelp-Clone/

## Scope

- Category browsing for restaurants, movies, shops, and schools
- Search by name, location, and tags
- Ratings/review-count cards with standard portfolio UI shell
- AWS-ready architecture direction

## AWS backend direction

1. API Gateway + Lambda listing/review APIs
2. DynamoDB for listings and review aggregates
3. OpenSearch for full-text discovery and ranking
4. S3 + EventBridge for ingestion and updates

## Local run

```bash
npm install
npm run dev
```