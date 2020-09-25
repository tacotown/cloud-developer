import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
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

  /**************************************************************************** */
app.get("/filteredimage/", async (req, res) => {

  let {image_url} = req.query;

  // validate image url
  if (!image_url)
  {
    return res.status(400).send("query parameter 'image_url' required");
  }

  // call filteredImageFromURL(image_url)
  // project team! Note: you cannot catch the exception from this
  // method if the url provided does not exist! Tried many
  // different ways, but ultimately had to modify the provided method
  const filteredFile = await filterImageFromURL(image_url);
  
  if (!filteredFile)
  {
    res.status(422).send("Unable to load image. Please check 'image_url'");
  }
  // 3. send the resulting file in the response res.status(200).sendFile(filteredImg, () => { // 4. deletes any files on the server on finish of the response deleteLocalFiles([filteredImg]); }); } catch (error) { res.status(415).send(error); }
   // send the resulting file in the response
   // delete any files on the server on finish of the response
  res.sendFile(filteredFile,(err)=>{
    deleteLocalFiles([filteredFile]);
  });
});

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running on ${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();