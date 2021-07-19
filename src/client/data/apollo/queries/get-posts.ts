import { gql } from '@apollo/client';

const GET_POSTS = gql`
    query GET_POSTS {
        posts {
            id
            title
            content
            author {
                id
                fullName
                userName
                avatar
            }
            dateOfPublication
            comments {
                id
                dateOfPublication
                content
                author {
                    id
                	fullName
                    userName
                    avatar
                }
                replyTo
                likers
                dislikers
            }
            likers {
                id
            }
            dislikers {
                id
            }
            reposters {
                id
            }
        }
    }
`;

export {GET_POSTS};