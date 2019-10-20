const api = 'https://api.themoviedb.org/3';
const key = '0a006db6cf3451fcf38c0518092cc84e';

const distMatrixApi = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';
const distMatrixApiKey = 'AIzaSyDp0tmStLHxOBidD8ji1GC-sbUrLuaYSGY';

const defaultContent = {
  api_key: key,
  language: 'en-US'
};

function queryString(obj) {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
}

async function request(url, content = {}, debug = false) {
  const obj = { ...defaultContent, ...content };

  const response = await fetch(`${api}/${url}?${queryString(obj)}`);
  const data = await (debug ? response.status : response.json());

  return data;
}

actionSubmit = () => {
		const { value } = this.state;
		const {navigate, typeRequest} = this.props;

		if (value) {
			navigate('SearchResults', {
				typeRequest,
				name: value,
				id: null,
			})
		}

	};