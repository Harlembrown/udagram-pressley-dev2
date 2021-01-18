import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
const targetBaseURL = 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg';

(async () => {                                                                                                                                                                                                                                                                                                         

  // Init the Express application
  const app = express();

  // Set the network port
  const PORT = process.env.PORT || 8082;


  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{http://Udagrampressleydev4-env.eba-ifw5pivi.us-east-1.elasticbeanstalk.com/}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /*****************************************************************************/
  app.get("/filteredimage", async (req: Request, res: Response) => {}) 
  // get the query variable to the endpoint.
    let image_url = req.query.image_url as string;
          
      if (image_url) {
        res.sendStatus(400).send(`image_url is required`);
      }

      try {
        const filteredpath = await filterImageFromURL(image_url);
        res.sendFile(filteredpath, () => deleteLocalFiles([filteredpath]));
      } catch (error) {
        res.sendStatus(422);
      }
    });

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  const newLocal = app.get("/", async (req, res) => {
    res.sendFile("try GET /filteredimage?image_url=http://Udagrampressleydev4-env.eba-ifw5pivi.us-east-1.elasticbeanstalk.com/");
  }); 


  // Start the Server
  app.listen(PORT, () => {
      console.log(`server running http://localhost:${PORT}`);
      console.log(`press CTRL+C to stop server`);

      function newFunction() {
        const debug = require('debug')('myApp:someComponent');
      
        debug('Here is a pretty object %o', { someObject: true });
      
        require('dotenv').config();
  } );
})();
