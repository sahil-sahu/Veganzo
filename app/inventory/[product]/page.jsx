'use client';
import * as React from 'react';
// import { usePathname } from 'next/navigation';
import Link from 'next/link'
import Boiler from '../../boiler';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import EditIcon from '@mui/icons-material/Edit';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Snackbar from '@mui/material/Snackbar';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import Appbar from './appbar';

import { storage, database} from '../../../firebase/config';
import { typesense } from '../../../typesense/config';
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore"; 
import { ref, deleteObject } from "firebase/storage";
import Search from '@mui/icons-material/Search';

const Row = ({ type, row, notify, setrefresh, refreshthis })=>{


    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleDel = async (e) => {
      let id = e.target.id;
      await deleteDoc(doc(database,`inventory/${type}/stack`, id));
      try {
        let delObj = ref(storage, `inventory/${type}/${id}`);
        await deleteObject(delObj);
      } catch (error) {
        console.log(error);
      }
      await typesense.collections('inventory').documents(id).delete()
      handleClose();
      notify(true);
      setrefresh(!refreshthis);

    }

  return (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right"><Link href={`/inventory/${type}/${row.id}`}><EditIcon /></Link></TableCell>
      <TableCell align="right"><DeleteIcon onClick={handleClickOpen}/></TableCell>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure ?"}
        </DialogTitle>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={handleClose}>
            Disagree
          </Button>
          <Button id={row.id} onClick={handleDel}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  )
}

const Product = ({ params }) => {
    const type = params.product;
    const [pdts, setPdt] = React.useState([]);
    const [querystr, setQuery] = React.useState('');
    const [toggle, setToggle] = React.useState(false);
    const [refresher, refresh] = React.useState(false);

    React.useEffect(()=>{
      (async function(){
        let snapshot;
        const ref = collection(database,`inventory/${type}/stack`);
        const q = querystr != ""? query(ref, where("name", "array-contains", querystr) ): null;
        let data = await typesense.collections('inventory').documents().search({
          'q'         : querystr,
          'query_by'  : 'name',
          'filter_by' : `type:=${type}`,
        })
        setPdt([...data.hits.map((e)=>{
          return { id : e.document.id, name: e.document.name }
        })])  

      }())
    }, [querystr, refresher])

    return (
      <Boiler title={type.charAt(0).toUpperCase()
        + type.slice(1)}>
        <Appbar type={type} />
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={(event, reason)=>{
          if (reason === 'clickaway') {
            return;
          }
      
          setToggle(false);
        }}
        open={toggle}
        autoHideDuration={3000}
        message="Item deleted"
        key={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      />  
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', width: "100%", justifyContent: 'flex-end',  alignItems: 'flex-end', mr: 1, my: 1.5 }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Search" value={querystr} onChange={(e)=>{setQuery(e.target.value)}} variant="standard" />
        </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead >
                        <TableRow className='tableName'>
                          <TableCell><b style={{'fontSize':18,}} >Product</b></TableCell>
                          <TableCell align="right"><b style={{'fontSize':18,}} >Edit</b></TableCell>
                          <TableCell align="right"><b style={{'fontSize':18,}} >Delete</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pdts.map((row) => (
                          <Row type={type} row={row} notify={setToggle} refresherthis={refresher} setrefresh={refresh} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Container>
      </Boiler>
    )
  }
  
export default Product;