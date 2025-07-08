import React, { useContext, useEffect, useState } from 'react'
import Question from './Question';
import { useForm } from 'react-hook-form';
import { MdAssignment } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { addPoints, getAssignment, submitAssignment } from '../services/operations/courseApis';
import {AuthContext} from '../context/AuthContext'
import { CourseContext } from '../context/CourseContext';

const Assignment = () => {

    // const totalQuestions = 3;
    // const questions = [
    //     {
    //         _id: "2371",
    //         statement: "Which function is used for length of an array",
    //         options: {
    //             option1: "size()",
    //             option2: "length()",
    //             option3: "something()",
    //             option4: "hello()",
    //         },
    //         correctAns: "0"
    //     },
    //     {
    //         _id: "2372",
    //         statement: "which function is used for length of an array",
    //         options: {
    //             option1: "size()",
    //             option2: "length()",
    //             option3: "something()",
    //             option4: "hello()",
    //         },
    //         correctAns: "0"
    //     },
    //     {
    //         _id: "2373",
    //         statement: "which function is used for length of an array",
    //         options: {
    //             option1: "size()",
    //             option2: "length()",
    //             option3: "something()",
    //             option4: "hello()",
    //         },
    //         correctAns: "0"
    //     }
    // ]

    const [questions,setQuestions] = useState();
    const {setPoints} = useContext(CourseContext)
    const [assignmentId,setAssignmentId] = useState();

    const {subSectionId} = useParams();
    const {token} = useContext(AuthContext);
    const {course} = useContext(CourseContext);

    useEffect(()=>{
        const fetchSubSectionDetails = async()=>{
            const data = await getAssignment({subSectionId,token});  
            setQuestions(data.questions);
            setAssignmentId(data._id);
        }

        fetchSubSectionDetails();
    },[])

    let checkAnswers = (userAnswers) =>{
        let count = 0;
        questions?.forEach((question) => {
            const userAnswer = userAnswers[question._id];
            if (userAnswer === question.correctAns) {
              count++;
            }
          });     
          
        return count;
    }

    const submitHandler = async(data) => {
        console.log(data);
        let correctAnsCount = checkAnswers(data)
        const response = await submitAssignment({courseId:course,token,assignmentId,subSectionId})

        if(response){
            await addPoints({correctAns:correctAnsCount,token,setPoints})
        }
        console.log("correct ans count is : ",correctAnsCount); 
    }

    const {
        register, handleSubmit, formState: { errors }
    } = useForm();

    return (
        <div className='text-richblack-5 flex justify-center pt-5'>
            <div>
                <p className='text-richblack-5 text-[34px] flex gap-2 items-center font-semibold'><MdAssignment className='text-yellow-50'/>Let us see how much you have learnt</p>
                <p className='text-blue-50 italic'>Choose only one option for each ques</p>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {
                        questions?.map((ques,index) => (
                            <div key={ques._id}>
                                <br></br>
                                <label name={ques._id}>Q{index+1}. {ques.statement}</label>
                                <br />
                                <input type='radio' value='0' name={ques._id}
                                    {...register(`${ques._id}`, { required: true })}
                                />
                                <span> {ques.option1}</span>
                                <br />
                                <input type='radio' value='1' name={ques._id}
                                    {...register(`${ques._id}`, { required: true })}
                                />
                                <span> {ques.option2}</span>
                                <br />
                                <input type='radio' value='2' name={ques._id}
                                    {...register(`${ques._id}`, { required: true })}
                                />
                                <span> {ques.option3}</span>
                                <br />
                                <input type='radio' value='3' name={ques._id}
                                    {...register(`${ques._id}`, { required: true })}
                                />
                                <span> {ques.option4}</span>
                                <br />
                            </div>
                        ))
                    }
                    <button className='bg-yellow-50 text-richblack-900 p-2 px-5 rounded-lg hover:scale-[0.98] mt-4 font-semibold'>Submit Assignment </button>
                </form>
            </div>
        </div>
    )
}

export default Assignment
