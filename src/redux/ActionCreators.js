import * as ActionTypes from './ActionTypes';

// every action has type, to define action type
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payLoad: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});