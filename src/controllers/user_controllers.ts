//user_controllers

import { PrismaClient } from "@prisma/client";


const schools = async (req: any, res: any, prisma: PrismaClient) => {
    prisma.school.findMany({
    }).then((schools) => {
        
        res.status(200).json(schools);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    })
}

const years = async (req: any, res: any, prisma: PrismaClient) => {
    const school = req.body.school;
    prisma.year.findMany({
        where: {
            
            schoolYears: {
                some:{
                    schoolId: school
                }
            }
        }
    }).then((years) => {
        
        res.status(200).json(years);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    })
}

const subject = async (req: any, res: any, prisma: PrismaClient) => {
    const {school, year} = req.body;
  let id =  await prisma.schoolYear.findMany({
        where:{schoolId: school, yearId: year},
})
    await prisma.subject.findMany({
        where: {
            
            schoolYearSubjects: {
                
                some:{
                    schoolYearId: id[0].id
                }
            }
}    }).then((years) => {
        
        res.status(200).json(years);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    })
}

const topics = async (req: any, res: any, prisma: PrismaClient) => {
    const {school, year,subject} = req.body;
    let id = await prisma.schoolYearSubject.findMany({
        
        where:{schoolYear: {schoolId: school, yearId: year}, subjectId: subject},
    })
    await prisma.topic.findMany({
        where: {
            
           schoolYearSubjectId : id[0].id
        }
    }).then((topics) => {
        
        res.status(200).json(topics);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    })
}
//     const {school, year,subject,topic} = req.body;
//     await prisma.test.findMany({
        
//         where:{topic:{
//             schoolYearSubject:{
//                 schoolYear:{
//                     schoolId: school,
//                     yearId: year
//                 },
//                 subjectId: subject
//             },
//             id: topic

//         }}}).then((topics) => {
        
//         res.status(200).json(topics);
//     }).catch((error) => {
//         res.status(500).json({ error: error.message });
//     })

const tests = async (req: any, res: any, prisma: PrismaClient) => {
    const { school, year, subject, topic } = req.body;

    await prisma.test.findMany({
        where: {
            topic: {
                schoolYearSubject: {
                    schoolYear: {
                        schoolId: school,
                        yearId: year,
                    },
                    subjectId: subject,
                },
                id: topic,
            },
        },
        select: {
            id: true,
            name: true,
            imgUrl: true,
            profesor: true,
            topicId: true,
        },
    })
    .then((tests) => {
        res.status(200).json(tests);
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
};



const summary = async (req: any, res: any, prisma: PrismaClient) => {
    const { school, year, subject, topic } = req.body;

    await prisma.summary.findMany({
        where: {
            topic: {
                schoolYearSubject: {
                    schoolYear: {
                        schoolId: school,
                        yearId: year,
                    },
                    subjectId: subject,
                },
                id: topic,
            },
        },
        select: {
            id: true,
            name: true,
            imgUrl: true,
            topicId: true,
        },
    })
    .then((tests) => {
        res.status(200).json(tests);
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
};


export const userControllers = {
    schools,
    years,
    subject,
    topics,
    tests,
    summary
}
