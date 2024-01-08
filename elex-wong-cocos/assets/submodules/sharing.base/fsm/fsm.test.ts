import { StateMachine } from './statemachine';
// const fsm = new StateMachine();
// // fsm.name("cubi").add();
// // fsm.name("guichu").from("cubi").do(() => console.log(123)).add();
// // fsm.from("cubi").to("guichu").do(() => )

// // fsm.")
// const a = 0;
// fsm.state = 'haha';
// fsm.transition('cubi -> go')
//     .when('btn a clicked')
//     // .when(() => a == 1)
//     .do((...args) => {
//         console.log(123, ...args)
//         fsm.channel.write('haha', { go: 1 });
//     })
//     .add();

// fsm.transition('go -> haha')
//     .when('haha')
//     .do((...args) => {
//         console.log('111==', ...args);
//         // return 'haha';
//     })
//     .add();

// // fsm.transition("go -> ?")
// //     .when("test ?")
// //     .do((...args) => {
// //         console.log('111==', ...args);
// //         // return 'haha';
// //     })
// //     .add();

// fsm.start();


// console.log(fsm.state);

// // 触发器（效率最差）
// // setTimeout(() => {
// //     a = 1;
// // },300);

// // //手动更改状态
// // fsm.state = "guichu";

// // 使用信道
// fsm.channel.write('btn a clicked', { go: 1 });

// // fsm.state = "go";

// // 使用信道
// // fsm.channel.write("guichu", { guichu: 1 });

// // setInterval(() => {

// //     console.log('fsm.state=', fsm.state);
// //     // if(fsm.state === "go"){
// //     //     fsm.state = "haha";
// //     // }
// //     // fsm.state = "guichu";
// // }, 500);