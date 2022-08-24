	// Config starter code
  import { createChatBotMessage } from "react-chatbot-kit";
import ButtonFavorites from "./witgets/Buttons/ButtonFavorites";
import ButtonCreateNewDog from "./witgets/Buttons/ButtonCreateNewDog";
import FrequentQuestions from "./witgets/Frequent questions/Frequent_Questions";
import ButtonDogsCreated from "./witgets/Buttons/ButtonDogsCreated";

  const config = {
    initialMessages: [
      createChatBotMessage(
        `Hello, How can I help you ?`,
        // {
        //   widget: "overview",
        // }
      ),
    ],
    widgets: [
      {
        widgetName: "FrequentQuestions",
        widgetFunc: (props) => <FrequentQuestions {...props} />,
      },
      {
        widgetName: "ButtonFavorites",
        widgetFunc: (props) => <ButtonFavorites  {...props} />,
      },
      {
        widgetName: "AnswerCreateNewDog",
        widgetFunc: (props) => <ButtonCreateNewDog {...props} />,
      },
      {
        widgetName: "ButtonDogsCreated",
        widgetFunc: (props) => <ButtonDogsCreated {...props} />,
      },
    ]
    //   {
    //     widgetName: "sponsors",
    //     widgetFunc: (props) => <ButtonToSponsor {...props} />,
    //   },
    //   {
    //     widgetName: "instruction",
    //     widgetFunc: (props) => <ButtonToInstructions {...props} />,
    //   },
    //   {
    //     widgetName: "contact",
    //     widgetFunc: (props) => <ButtonContact {...props} />,
    //   },
    //   {
    //     widgetName: "tournament",
    //     widgetFunc: (props) => <ButtonToTournament {...props} />,
    //   },
    // ],
    // customStyles: {
    //   botMessageBox: {
    //     backgroundColor: "#212529",
    //   },
    //   chatButton: {
    //     backgroundColor: "#A7D129",
    //   },
    //   input: {
    //     border: "5px solid #A7D129",
    //   },
    // },
  };
  
  
  export default config