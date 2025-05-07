import {
  Box,
  Typography,
  List,
  Button,
  CardActions,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { getCommunities } from "@usecase/communityUsecase";
import { Community } from "../domain/community";
import Link from "next/link";
import { useEffect } from "react";
import { useCommunity } from "../shared/useCommunity";

export default function Communities() {
  const { communities, setCommunities } = useCommunity();
  useEffect(() => {
    (async () => {
      const data = await getCommunities();
      setCommunities(data);
    })();
  }, [setCommunities]);
  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        コミュニティ一覧
      </Typography>
      <List sx={{ width: "100%" }}>
        {communities.map((c) => (
          <Card key={c.id} elevation={2} sx={{ mb: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                {c.name[0]}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.description}
                </Typography>
              </Box>
              <CardActions>
                <Link href={`/community/${c.id}`} passHref>
                  <Button variant="contained" color="primary">
                    投稿・閲覧
                  </Button>
                </Link>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
}
