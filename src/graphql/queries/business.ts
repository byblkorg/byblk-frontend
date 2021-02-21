import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";

export const getLocalBusinesses = gql`
  query getBusinessesWithOptions($csc: String!, $region: String!, $limit: Int) {
    getBusinessesWithOptions(csc: $csc, region: $region, limit: $limit) {
      items {
        id
        name
        address
        headerImage
        description
        phone
        website
        tags
        city
        state
        region
        csc
        slug
      }
    }
  }
`;

export const getFeaturedBusinesses = gql`
  query getFeaturedBusinesses($limit: Int) {
    getFeaturedBusinesses(limit: $limit) {
      items {
        id
        name
        address
        headerImage
        description
        phone
        website
        tags
        city
        state
        region
        csc
        slug
      }
    }
  }
`;

export const getBusinessByLocationAndSlug = gql`
  query getBusinessByLocationAndSlug($csc: String!, $slug: String!) {
    getBusinessByLocationAndSlug(csc: $csc, slug: $slug) {
      items {
        id
        name
        address
        headerImage
        description
        phone
        website
        tags
        city
        state
        region
        csc
        slug
      }
    }
  }
`;

export const getBusinessWithFilters = gql`
  query getBusinessesWithOptions(
    $csc: String!
    $region: String!
    $industry: String
  ) {
    getBusinessesWithOptions(
      csc: $csc
      region: $region
      filter: { industry: { eq: $industry } }
    ) {
      items {
        id
        name
        address
        headerImage
        description
        phone
        website
        tags
        city
        state
        region
        csc
        slug
      }
    }
  }
`;

export const getBusinessBySlug = gql`
  query getBusinessBySlug($slug: String!) {
    getBusinessBySlug(slug: $slug) {
      items {
        id
        name
        address
        headerImage
        description
        phone
        website
        tags
        city
        state
        region
        csc
        slug
      }
    }
  }
`;

export async function fetchLocalBusinesses(region: string, csc: string) {
  const businesses = await API.graphql(
    graphqlOperation(getLocalBusinesses, {
      region,
      csc,
    })
  );

  return businesses;
}

export async function fetchFeaturedBusinesses() {
  const businesses = await API.graphql(graphqlOperation(getFeaturedBusinesses));
  return businesses;
}

export async function getBusiness(csc: string, slug: string) {
  const businesses = await API.graphql(
    graphqlOperation(getBusinessByLocationAndSlug, {
      csc,
      slug,
    })
  );

  return businesses.data.getBusinessByLocationAndSlug.items[0];
}

export async function fetchBusinessWithFilters(
  region: string,
  csc: string,
  industry: string
) {
  const businesses = await API.graphql(
    graphqlOperation(getBusinessWithFilters, {
      region,
      csc,
      industry,
    })
  );

  return businesses;
}

export async function fetchBusinessWithSlug(slug: string) {
  const businesses = await API.graphql(
    graphqlOperation(getBusinessBySlug, {
      slug,
    })
  );

  return businesses;
}
