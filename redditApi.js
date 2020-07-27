export default {
    searchPost: function(searchTerm, searchLimit, searchSortBy){
        return fetch(`http://www.reddit.com/search.json?q=
        ${searchTerm}&sort=${searchSortBy}&limit=${searchLimit}`)
            .then(response => response.json())
            .then(data => data.data.children.map(data => data.data))
            .catch(error => console.log(error))
    },
    searchSubreddit: function (searchTerm, searchNsfw) {
        let params = {
            query: searchTerm,
            include_over_18: searchNsfw
        };

            let x =fetch(`http://www.reddit.com/api/search_subreddits.json`, {
                method: 'POST',
                // mode: 'no-cors',
                body: JSON.stringify(params)
            }).then(response => response.json())
                .then(data => data)
                .catch(error => console.log(error));

            console.log(x)


        // console.log(searchTerm + searchNsfw)
    }
};