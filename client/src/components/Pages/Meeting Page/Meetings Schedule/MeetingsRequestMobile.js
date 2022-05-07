import {
  Box,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import fetchService from "../../../../services/fetchService";
import { Redirect } from "react-router-dom";
import Loading from "../../../Loading";
import MeetingSlot from "./MeetingsRequestMobileSlot";

function MeetingsRequestMobile(props) {
  const [schedule, setSchedule] = React.useState([]);
  const [tabValue, setTabValue] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [slotKey, setSlotKey] = React.useState(new Date().getTime());

  React.useEffect(() => {
    document.title = "Meetings - Schedule - Student Specialty Advisor";
  }, []);

  const isMobile = useMediaQuery("(max-width:1080px)", { noSsr: true });

  const fetchSchedule = () => {
    fetchService
      .doGET("meeting/schedule")
      .then((response) => {
        if (response.success) {
          for (var i = 0; i < response.meetings.length; i++) {
            if (response.meetings[i].col < response.currentDayIndex) {
              response.meetings[i].isAvailable = false;
              response.meetings[i].passed = true;
            }
          }
          setSchedule(response.meetings);
          setIsLoaded(true);
          setSlotKey(new Date().getTime());
        } else {
          throw response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const mappingFunction = (element) => {
    return (
      <MeetingSlot
        key={"mobile r" + element.row + "c" + element.col + slotKey}
        element={element}
        fetchSchedule={fetchSchedule}
      />
    );
  };

  const empty = (
    <div>
      <Paper className="meetings-request-mobile-element" elevation={0}>
        <Typography textAlign="center" variant="p" margin="1.5%">
          There are no meetings scheduled for this day yet.
        </Typography>
      </Paper>
      <Divider sx={{ bgcolor: "var(--myblue)", width: "100%" }} />
    </div>
  );

  const monday = schedule
    .filter((element) => element.col === 0)
    .map(mappingFunction);
  const tuesday = schedule
    .filter((element) => element.col === 1)
    .map(mappingFunction);
  const wednesday = schedule
    .filter((element) => element.col === 2)
    .map(mappingFunction);
  const thursday = schedule
    .filter((element) => element.col === 3)
    .map(mappingFunction);
  const friday = schedule
    .filter((element) => element.col === 4)
    .map(mappingFunction);
  const saturday = schedule
    .filter((element) => element.col === 5)
    .map(mappingFunction);

  React.useEffect(() => {
    fetchSchedule();
    return () => {
      setSchedule([]);
    };
  }, []);

  return isMobile ? (
    <div
      className="meetings-request-container"
      style={{ marginBottom: "120px" }}
    >
      <h1 className="meetings-request-title">Current Meetings Schedule</h1>
      <p className="meetings-request-subtitle">
        Below are all the meetings for this week. All the meetings will be reset
        back to available on Saturday at Midnight.
      </p>
      {isLoaded ? (
        <>
          <Box
            marginTop="3%"
            marginLeft="auto"
            marginRight="auto"
            display="flex"
            justifyContent="center"
            width="90%"
            sx={{
              borderTop: 1,
              borderBottom: 1,
              borderRight: 1,
              borderLeft: 1,
              borderWidth: 2,
              borderBottomWidth: 1,
              borderColor: "var(--myblue)",
              bgcolor: "white",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(event, newValue) => {
                setTabValue(newValue);
              }}
              textColor="inherit"
              sx={{ color: "var(--myblue)" }}
              TabIndicatorProps={{ sx: { bgcolor: "var(--myblue)" } }}
              variant="scrollable"
              scrollButtons={true}
              allowScrollButtonsMobile
            >
              <Tab label="Monday" />
              <Tab label="Tuesday" />
              <Tab label="Wednesday" />
              <Tab label="Thursday" />
              <Tab label="Friday" />
              <Tab label="Saturday" />
            </Tabs>
          </Box>
          <Box
            width="90%"
            marginLeft="auto"
            marginRight="auto"
            sx={{
              borderRight: 1,
              borderLeft: 1,
              borderWidth: 2,
              borderColor: "var(--myblue)",
              bgcolor: "white",
            }}
          >
            <div role="tabpanel" hidden={tabValue !== 0}>
              {monday.length === 0 ? empty : monday}
            </div>
            <div role="tabpanel" hidden={tabValue !== 1}>
              {tuesday.length === 0 ? empty : tuesday}
            </div>
            <div role="tabpanel" hidden={tabValue !== 2}>
              {wednesday.length === 0 ? empty : wednesday}
            </div>
            <div role="tabpanel" hidden={tabValue !== 3}>
              {thursday.length === 0 ? empty : thursday}
            </div>
            <div role="tabpanel" hidden={tabValue !== 4}>
              {friday.length === 0 ? empty : friday}
            </div>
            <div role="tabpanel" hidden={tabValue !== 5}>
              {saturday.length === 0 ? empty : saturday}
            </div>
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </div>
  ) : (
    <Redirect to="/meetings/schedule" />
  );
}

export default MeetingsRequestMobile;
