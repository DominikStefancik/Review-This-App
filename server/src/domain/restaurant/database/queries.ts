export const SELECT_ALL_RESTAURANTS_WITH_REVIEW_STATISTICS = `SELECT * FROM restaurant LEFT JOIN
        (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 2) AS average_rating FROM review
         GROUP BY restaurant_id) AS review
        ON restaurant.id = review.restaurant_id`;

export const SELECT_RESTAURANT_BY_ID_WITH_REVIEW_STATISTICS = `SELECT * FROM restaurant LEFT JOIN 
        (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS average_rating FROM review
         GROUP BY restaurant_id) AS review
         ON restaurant.id = review.restaurant_id
         WHERE restaurant.id = $1`;
