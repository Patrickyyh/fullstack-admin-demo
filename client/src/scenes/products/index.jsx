import React , {useState} from 'react'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
import { useGetProductsQuery } from 'state/api';
import Header from 'components/Header';


const Product = ({
    _id,
    name,
    price,
    rating,
    category,
    supply,
    stat
}) =>{

    const theme = useTheme();

}

const Products = () => {

  const{data , isLoading} = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 100px)");
  console.log(data);

  return (
   <Box m ="1.5rem 2.5rem">
       <Header title="Products" subtitle="See your list of products. "/>
            {
                data || !isLoading ? (
                    <Box
                        mt = "20px"
                        display="grid"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        justifyContent= "space-between"
                        rawGap = "20px"
                        columnGap= "1.33%"
                        sx = {{
                            " & > div " : { gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                     >
                        {
                            // data.map() => (

                            // )
                        }

                      </Box>
                ):(
                    <>Loading....</>
                  )
            }
   </Box>
  )
}

export default Products
