import { gql } from "@apollo/client"
import client from "../../utils/apolloClient"
import parse from "html-react-parser"

export default function Post({ post }) {
	console.log(parse(post.content))
	return (
		post && (
			<div>
				<h2>{post.title}</h2>
				<p>{parse(`${post.content}`)}</p>
			</div>
		)
	)
}

// get slug from url and fetch post by slug
export async function getServerSideProps({ params }) {
	const POST_BY_SLUG_QUERY = gql`
		query PostBySlug($slug: String!) {
			postBy(slug: $slug) {
				id
				title
				content
			}
		}
	`
	const { data } = await client.query({
		query: POST_BY_SLUG_QUERY,
		variables: {
			slug: params.slug,
		},
	})

	return {
		props: {
			post: data.postBy,
		},
		// revalidate: 60,
	}
}

// export async function getStaticPaths() {
// 	const ALL_POSTS_QUERY = gql`
// 		query {
// 			posts(first: 500) {
// 				edges {
// 					node {
// 						id
// 						slug
// 					}
// 				}
// 			}
// 		}
// 	`
// 	const { data } = await client.query({
// 		query: ALL_POSTS_QUERY,
// 	})

// 	return {
// 		paths: data.posts.edges.map(({ node }) => ({
// 			params: { slug: node.slug },
// 		})),
// 		fallback: false,
// 	}
// }
