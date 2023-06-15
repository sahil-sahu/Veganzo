'use client';
import * as React from 'react';
import { useRouter } from 'next/router'
// import { usePathname } from 'next/navigation';
import Boiler from '../../../boiler';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

import Appbar from '../appbar';

import FullFeaturedCrudGrid from './datagrid';
import MultiFile from './file';

import { database, storage } from '../../../../firebase/config';
import { typesense } from '../../../../typesense/config';
import { collection, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const Add = ({ params }) => {
    const type = params.product;
    const docID = params.pdtid;
    console.log(docID)
    const [docref, setDocref] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const [name, setName] = React.useState('')
    const [descrip, setDesc] = React.useState(``)
    const [rows, setRows] = React.useState([]);
    const [fileData, setFiles] = React.useState([]);
    const [delload, setDelLoad] = React.useState([]);

    const buttonSx = {
      ...(success && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
    };

    const handleSubmit = async ()=>{
      setSuccess(false);
      setLoading(true);
      // console.log(fileData);
      await checkDeletion();
      let arr = await upload(fileData);
      await updateDoc(docref, {
        name,
        descrip,
        catgories:rows,
        gallery: [...arr.map(e => { 
          return {
          id: e.id,
          url: e.url,
          name: e.name,
        }})],
      });
      await typesense.collections('inventory').documents(docID).update({
        name,
        descrip,
        type: type,
        cover: arr.length>0? arr[0].url:"",
      })
      setFiles(arr);
      setLoading(false);
      setSuccess(true);
      setTimeout(()=>{setSuccess(false);}, 5000)
    }

    const checkDeletion = async () => {
      delload.forEach(async e => {
        let delObj = ref(storage, `inventory/${type}/${docID}/${e}`);
        await deleteObject(delObj);
      });
    }

    const upload = (marr)=>{
      return new Promise(async function(resolve, reject){
        let list = [];
        marr.forEach(e => {
          list.push(
            new Promise(async function(resolve, reject){
              if(e.file){
                let imgRef = ref(storage,`inventory/${type}/${docID}/${e.id}`);
                let response = await uploadBytes(imgRef, e.file);
                let downloadUrl = await getDownloadURL(response.ref);
                e.file = null;
                delete e.file;
                resolve({
                  ...e,
                  url:downloadUrl,
                });
              } else {
                resolve({...e});
              }
            })
          );
        });
        let values = await Promise.all(list);
        resolve(values);
        reject(marr);
      })

    }

    const handleDel = (e) => {
      let arr = fileData;
      let i = parseInt(e.currentTarget.id);
      // console.log(fileData.length)
      try {
        if (!arr[i].file){
          setDelLoad([...delload, arr[i].id]);
        }
        arr.splice(i, 1);
        setFiles([...arr]);
      } catch (error) {
        console.log(error);
        // console.log("jhol mal");
      }
    }

    React.useEffect(()=>{
      (async function(){
        const ref = doc(database, `inventory/${type}/stack`, docID);
        const docSnap = await getDoc(ref);
      
      if (docSnap.exists) {
        setDocref(ref);
        setName(docSnap.data().name);
        setDesc(docSnap.data().descrip);
        setRows(docSnap.data().catgories);
        setFiles(!docSnap.data().gallery?[]:docSnap.data().gallery);

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })()

    },[type, docID])

    return (
      <Boiler title={type.charAt(0).toUpperCase()
        + type.slice(1)}>
        <Appbar type={type} />  
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <FormControl sx={{ p: 2 }}>
                    <InputLabel htmlFor="my-input">Product Name</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                  </FormControl>
                  <FormControl sx={{ p: 2 }}>
                    <TextField
                      id="standard-multiline-flexible"
                      label="Product Description"
                      variant="standard"
                      multiline
                      sx={{ p: 1 }}
                      maxRows={6}
                      value={descrip}
                      onChange={(e)=>{setDesc(e.target.value)}}></TextField>
                  </FormControl>
                  <div sx={{ p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Category
                    </Typography>
                    <FullFeaturedCrudGrid data={rows} changer={setRows}>
                    </FullFeaturedCrudGrid>
                  </div>
                  <br />
                  <div sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                      Gallery
                    </Typography>
                    <MultiFile data={fileData} func={setFiles} handleDel={handleDel} />
                  </div>
                  <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={handleSubmit}
                  >
                    {success ? <CheckIcon /> : <SaveIcon />}
                  {loading ? (
                    <CircularProgress
                      size={68}
                      sx={{
                        color: green[500],
                        top: -6,
                        position: 'absolute',
                        left: -6,
                        zIndex: 1,
                      }}
                    />
                  ):null}
                  </Fab>
                </Paper>
              </Grid>
            </Grid>
          </Container>
      </Boiler>
    )
  }


  
export default Add;