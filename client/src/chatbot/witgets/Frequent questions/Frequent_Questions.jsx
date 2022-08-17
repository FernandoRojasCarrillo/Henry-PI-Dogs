import '../Styles/Styles.css';

const FrequentQuestions = (props) => {
  const options = [
    {
      name: "How to create a new dog",
      handler: props.actionProvider.AnswerCreateNewDog,
      id: 1,
    },
    {
      name: "How to find the favorites section",
      handler: props.actionProvider.ButtonFavorites,
      id: 2,
    },
    {
      name: "how to find the dogs that have been created",
      handler: props.actionProvider.ButtonDogsCreated,
      id: 2,
    },
  ];
  // return <Options options={options} title="Frequent Questions" {...props} />;
  return (
    <>
      {options.map((option) => (
        <p className='Frequent_question' onClick={option.handler} key={option.id}>
          {option.name}
          <div className='Arrow' ></div>
        </p>
      ))}
    </>
  )
};

export default FrequentQuestions;
