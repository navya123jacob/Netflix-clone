const api_key='e4e45a20228c52168f203a93ec71c9ac';

const requests={
    genres:`/genre/movie/list?language=en&api_key=${api_key}`,
    action:`/discover/movie?api_key=${api_key}&with_genres=28`,
    Comedy:`/discover/movie?api_key=${api_key}&with_genres=35`,
    Adventure:`/discover/movie?api_key=${api_key}&with_genres=12`,
    Popular:`/movie/popular?language=en-US&page=1&api_key=${api_key}`,
    NetflixOrg:`/discover/tv?api_key=${api_key}&with_networks=213`,
    Animation:`/discover/movie?api_key=${api_key}&with_genres=16`,
    Crime:`/discover/movie?api_key=${api_key}&with_genres=80`,
    Horror:`/discover/movie?api_key=${api_key}&with_genres=27`,
    
    
}
export default requests;