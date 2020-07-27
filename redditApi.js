export default {
    searchPost: function(searchTerm, searchLimit, searchSortBy){
        return fetch(`http://www.reddit.com/search.json?q=
        ${searchTerm}&sort=${searchSortBy}&limit=${searchLimit}`)
            .then(response => response.json())
            .then(data => data.data.children.map(data => data.data))
            .catch(error => console.log(error))
    },
    searchSubreddit: function (searchTerm, searchLimit) {

    }
};