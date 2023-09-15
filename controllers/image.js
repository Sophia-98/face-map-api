const returnsetupClarifaiRequestOptions = (imageURL) => {

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '1e18ddb1b8684ae797f09150acc6ec93';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'sophia98';       
    const APP_ID = 'Face-detection';
    // Change these to whatever model and image URL you want to use
    //const MODEL_ID = 'face-detection';  
    const IMAGE_URL = imageURL;
    
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    
    return requestOptions
    }

    const handleApiCall = (req, res) => {
        fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnsetupClarifaiRequestOptions(req.body.input))
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch from Clarifai API');
            }
            return response.json();
          })
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            console.error(err);
            res.status(400).json('Unable to work with the API');
          });
      };
      





const handleImage = (req, res, db) => {
    const { id } = req.body;
    
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if (entries.length > 0) {
            res.json(entries[0]);
        } else {
            res.status(404).json('User not found');
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json('Error updating entries');
    });
}

module.exports = {
    handleImage,
    handleApiCall
};