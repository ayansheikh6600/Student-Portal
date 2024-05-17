import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";
import ViewModal from '../ViewModal/index';

interface MediaProps {
  loading?: boolean;
  data?: any;
}

function Media(props: MediaProps) {
  const { loading = false, data } = props;

  const [content, setContent] = React.useState()
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Grid
      container
      sx={{
        gap: 2,
        justifyContent: "center",
      }}
    >
      {(loading ? Array.from(new Array(5)) : data).map(
        (item: any, index: any) => (
          <Box
            key={index}
            sx={{
              marginRight: 0.5,
              width: 310,
              my: 5,
              boxShadow: 3,
              padding: 1,
              borderRadius: 2,
              display : "flex",
              flexDirection : "column",
            }}
          >
            {item ? (
              item?.videoUrl ? (
                <iframe
                  style={{ width: 310, height: 158 }}
                  src={item.videoUrl}
                />
              ) : (
                <a href={item?.image} target="_blank">
                  <img
                    src={item?.image}
                    style={{ width: 310, height: 158 }}
                    alt=""
                  />
                </a>
              )
            ) : (
              <Skeleton variant="rectangular" width={310} height={158} />
            )}
            {item ? (
              <Box sx={{ pr: 2 }}>
                <Typography
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "bold",
                  }}
                  gutterBottom
                  variant="body2"
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "regular",
                  }}
                  display="block"
                  variant="caption"
                  color="text.secondary"
                >
                  {item.desc}
                </Typography>
                {item?.otherLink ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "regular",
                      }}
                      display="block"
                      variant="caption"
                      color="text.secondary"
                      component="a"
                      href={item?.otherLink}
                    >
                      <a
                        href={item?.otherLink}
                        className="hover:text-blue-600"
                        target="_blank"
                      >
                        {item.otherLink}
                      </a>
                    </Typography>
                  </>
                ) : (
                  ""
                )}

                <div className="bg-black">
                  <Button onClick={()=>{setContent(item), setIsModalOpen(!isModalOpen)}}>Visit</Button>
                  <ViewModal isOpen={isModalOpen} isClose={setIsModalOpen} content={content}/>
                </div>
              </Box>
            ) : (
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            )}
          </Box>
        )
      )}
    </Grid>
  );
}

export default function YouTube({ data }: any) {
  return (
    <Box sx={{ width: "100%" }}>
      {!data ? <Media loading /> : <Media data={data} />}
    </Box>
  );
}
