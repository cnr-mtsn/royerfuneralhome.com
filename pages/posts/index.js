import { gql } from "@apollo/client"
import client from "../../utils/apolloClient"

export default function Posts({ posts }) {
	if (!posts) return <p>Loading...</p>

	return posts.map(p => (
		<div
			className="w-1/2 mx-auto my-10 flex flex-col items-center gap-4"
			key={p.id}
		>
			<a
				href={`/posts/${p.slug}`}
				className="text-lg font-bold italicl cursor-pointer"
			>
				{p.title}
			</a>
			<p>{p.excerpt}</p>
		</div>
	))
}

export async function getStaticProps() {
	const ALL_POSTS_QUERY = gql`
		query {
			posts(first: 500) {
				edges {
					node {
						id
						title
						excerpt
						slug
					}
				}
			}
		}
	`
	const { data } = await client.query({
		query: ALL_POSTS_QUERY,
	})

	return {
		props: {
			posts: data.posts.edges.map(({ node }) => node),
		},
	}
}
