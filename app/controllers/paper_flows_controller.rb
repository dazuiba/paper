class PaperFlowsController < ApplicationController
  # GET /paper_flows
  # GET /paper_flows.xml
  def index
    @paper_flows = PaperFlow.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @paper_flows }
    end
  end

  # GET /paper_flows/1
  # GET /paper_flows/1.xml
  def show
    @paper_flow = PaperFlow.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @paper_flow }
    end
  end

  # GET /paper_flows/new
  # GET /paper_flows/new.xml
  def new
    @paper_flow = PaperFlow.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @paper_flow }
    end
  end

  # GET /paper_flows/1/edit
  def edit
    @paper_flow = PaperFlow.find(params[:id])
  end

  # POST /paper_flows
  # POST /paper_flows.xml
  def create
    @paper_flow = PaperFlow.new(params[:paper_flow])

    respond_to do |format|
      if @paper_flow.save
        flash[:notice] = 'PaperFlow was successfully created.'
        format.html { redirect_to(@paper_flow) }
        format.xml  { render :xml => @paper_flow, :status => :created, :location => @paper_flow }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @paper_flow.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /paper_flows/1
  # PUT /paper_flows/1.xml
  def update
    @paper_flow = PaperFlow.find(params[:id])

    respond_to do |format|
      if @paper_flow.update_attributes(params[:paper_flow])
        flash[:notice] = 'PaperFlow was successfully updated.'
        format.html { redirect_to(@paper_flow) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @paper_flow.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /paper_flows/1
  # DELETE /paper_flows/1.xml
  def destroy
    @paper_flow = PaperFlow.find(params[:id])
    @paper_flow.destroy

    respond_to do |format|
      format.html { redirect_to(paper_flows_url) }
      format.xml  { head :ok }
    end
  end
end
