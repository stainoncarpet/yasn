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
            }
            likers
            dislikers
            reposters
        }
    }
`;

export {GET_POSTS};