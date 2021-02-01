import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestFlow, TestTable, TestTableLine } from '../model/flow-data.model';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { StringUtils } from 'src/app/utils/string';
import { FlowService } from 'src/app/services/flow/flow.service';

@Component({
    selector: 'add-edit',
    templateUrl: 'add-edit.html',
    styleUrls: ['./add-edit.css']
})
export class AddEditPackage implements OnInit, OnDestroy {

    private sub: any;
    constructor(
        private flowService: FlowService,
        private route: ActivatedRoute,
        private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        if (!navigation.extras.state || !navigation.extras.state.flow)
            return;

        this.flow = navigation.extras.state.flow;
    }

    flow: TestFlow = {
        name: '',
        tables: [],
        _id: ''
    }

    openCode = false;
    code = '';

    headers = ['Sistema', 'Cenário', 'Status do Teste'];


    addTable() {
        this.flow.tables.push({
            name: "",
            description: "Testes no Serviço",
            headers: this.headers,
            lines: [
                {
                    description: '',
                    texts: this.headers.map(() => ({ text: '', isDynamic: false })),
                    commands: []
                }
            ]
        });
    }

    removeTable(index) {
        if (!confirm("Confirm delete of table?"))
            return;

        this.flow.tables.splice(index, 1);
    }

    addLine(table) {
        table.lines.push({
            description: '',
            texts: table.headers.map(() => ({ text: '', isDynamic: false })),
            commands: []
        });
    }

    removeLine(table: TestTable, index) {
        if (!confirm("Confirm delete of evidence?"))
            return;

        table.lines.splice(index, 1);
    }

    addCommand(line: TestTableLine) {
        line.commands.push({ url: '', isCode: false });
    }

    removeCommand(line, index) {
        if (!confirm("Confirm delete of command?"))
            return;

        line.commands.splice(index, 1);
    }

    addCode(table: TestTable) {
        try {
            const lines = eval(this.code);
            table.lines = table.lines.concat(lines);
            this.openCode = false;
            this.code = '';
        } catch (err) {
            alert(err);
        }
    }

    up(list: [], index) {
        if (index == 0) return;

        const obj = list.splice(index, 1);
        list.splice(index - 1, 0, obj[0]);
    }

    down(list: [], index) {
        if (index >= list.length - 1) return;

        const obj = list.splice(index, 1);
        list.splice(index + 1, 0, obj[0]);
    }

    ngOnInit() {
        console.log(history.state.data);

        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            if (!id)
                return;

            this.flowService.getById(id)
                .then((flow) => this.flow = flow)
                .catch(err => console.log(err));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    except(text, limit) {
        return StringUtils.except(text, limit);
    }

    create() {
        this.flowService.create(this.flow)
            .then((response) => this.router.navigate(['/flow']))
            .catch(err => console.log(err));
    }
}
